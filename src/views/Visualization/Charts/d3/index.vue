<template>
    <div>
        <h3>堆积图</h3>
        <svg id="chart"></svg>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    data() {
        return {
            max: 0,
        };
    },
    mounted() {
        d3.csv('http://localhost:8080/2013-2020货物运输量月度.csv').then(
            (data) => {
                // 处理数据 汇总每年的数据
                this.dealData = this.initData(data);
                this.drawChart();
            }
        );
    },
    methods: {
        initData(data) {
            /**
             * 转换成合适的格式
             * [{
             * day: 2013-01
             * quantity: 452036,
             * type:truck  公路 truck 铁路 train 水运 ship 民航 plane
             * }]
             *
             * [{
             * day: 2013-01
             * train: 452036,
             * ship:33,
             * plane:33156,
             * truck:55684
             * type:truck  公路 truck 铁路 train 水运 ship 民航 plane
             * }]
             */
            let arr = [];
            for (let i = 0; i <= 3; i++) {
                let item = data[i];
                let idx = Object.keys(item).slice(0, 1);
                let type = this.getType(item[idx]);
                let objs = Object.keys(item).slice(1);
                objs.map((child) => {
                    arr.push({
                        type,
                        day: new Date(
                            child.substring(0, 4),
                            child.substring(5, child.length - 1) - 1,
                            1
                        ),
                        quantity: Number(item[child]),
                    });
                });
            }
            let arr1 = {};
            arr.map((item) => {
                if (arr1[item.day]) {
                    arr1[item.day].push(item);
                } else {
                    arr1[item.day] = [];
                    arr1[item.day].push(item);
                }
            });
            let arr2 = [];
            Object.keys(arr1).map((item) => {
                arr2.push({
                    day: arr1[item][0].day,
                    train: arr1[item][0].quantity,
                    truck: arr1[item][1].quantity,
                    ship: arr1[item][2].quantity,
                    plane: arr1[item][3].quantity,
                });
            });
            return arr2;
        },
        getType(str) {
            let type;
            if (str.indexOf('公路') !== -1) {
                type = 'truck';
            } else if (str.indexOf('铁路') !== -1) {
                type = 'train';
            } else if (str.indexOf('水运') !== -1) {
                type = 'ship';
            } else if (str.indexOf('民航') !== -1) {
                type = 'plane';
            }
            return type;
        },
        drawChart() {
            const [SVG_WID, SVG_HEI] = [1000, 800];
            const margin = { top: 80, right: 40, bottom: 230, left: 50 };
            // 画布
            this.chart = d3
                .select('#chart')
                .attr('width', SVG_WID)
                .attr('height', SVG_HEI);

            // 绘制堆叠面积图数据处理
            let series = d3.stack().keys(['train', 'ship', 'plane', 'truck'])(
                this.dealData
            );
            // x轴
            let xScale = d3
                .scaleTime()
                .range([0, SVG_WID - margin.left - margin.right])
                .domain(
                    d3.extent(this.dealData, function(d) {
                        return d.day;
                    })
                );
            let xAxis = d3
                .axisBottom(xScale)
                // 刻度格式
                .tickFormat(d3.timeFormat('%Y年%m月'))
                .tickSizeInner(6)
                .tickSizeOuter(0);
            this.chart
                .append('g')
                .attr('class', 'xAxis')
                .attr(
                    'transform',
                    'translate(' +
                        margin.left +
                        ',' +
                        (SVG_HEI - margin.bottom) +
                        ')'
                )
                .call(xAxis);
            // y轴
            let yScale = d3
                .scaleLinear()
                .range([SVG_HEI - margin.top - margin.bottom, 0])
                .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))]);
            let yAxis = d3
                .axisLeft(yScale)
                .ticks(10)
                .tickSizeOuter(0); // ticks分几个刻度
            this.chart
                .append('g')
                .attr('class', 'yAxis')
                .attr(
                    'transform',
                    'translate(' + margin.left + ',' + margin.top + ')'
                )
                .call(yAxis)
                .append('text')
                .attr('transform', 'translate(' + 10 + ', -20)')
                .style('fill', '#000')
                .text('货运量(万吨)');
            // 绘制堆叠面积图
            let mainAreaPath = d3
                .area()
                .curve(d3.curveMonotoneX)
                .x((d) => {
                    return xScale(d.data.day);
                })
                .y0((d) => {
                    return yScale(d[0]);
                })
                .y1((d) => {
                    return yScale(d[1]);
                });
            let color = d3.scaleOrdinal(d3.schemeCategory10);
            this.chart
                .append('g')
                .selectAll('path')
                .attr('class', 'area')
                .data(series)
                .join('path')
                .attr('d', mainAreaPath)
                .attr(
                    'transform',
                    'translate(' + margin.left + ',' + margin.top + ')'
                )
                .attr('stroke', 'none')
                .attr('stroke-width', 1)
                .attr('fill', function(d, i) {
                    return color(i);
                });
            this.subChart(); // 绘制滑动框
        },
        subChart() {},
    },
};
</script>
