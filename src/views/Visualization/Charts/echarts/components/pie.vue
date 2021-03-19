<template>
    <div ref="pie" :style="{ width: '450px', height: '300px' }"></div>
</template>

<script>
import * as Echarts from 'echarts';
export default {
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = Echarts.init(this.$refs.pie);
        // // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '5%',
                left: 'center',
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        { value: 1048, name: '搜索引擎' },
                        { value: 735, name: '直接访问' },
                        { value: 580, name: '邮件营销' },
                        { value: 484, name: '联盟广告' },
                        { value: 300, name: '视频广告' },
                    ],
                },
            ],
        });
    },
};
</script>
