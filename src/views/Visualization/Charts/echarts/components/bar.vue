<template>
    <v-chart
        ref="bar"
        :option="options"
        :style="{ width: '450px', height: '300px' }"
    ></v-chart>
</template>

<script>
export default {
    data() {
        return {
            options: {
                tooltip: {},
                xAxis: {
                    data: [
                        '衬衫',
                        '羊毛衫',
                        '雪纺衫',
                        '裤子',
                        '高跟鞋',
                        '袜子',
                    ],
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
            },
        };
    },
};
</script>
