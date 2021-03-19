<template>
    <div ref="bar" :style="{ width: '450px', height: '300px' }"></div>
</template>

<script>
const echarts = require('echarts');
export default {
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.bar);
        // 绘制图表
        myChart.setOption({
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            },
            legend: {
                data: ['销量'],
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20],
                },
            ],
        });
    },
};
</script>
