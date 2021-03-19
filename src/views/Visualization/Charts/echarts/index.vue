<template>
    <div>
        <card title="柱状图"><bar></bar></card>
        <card title="折线图"><my-line></my-line></card>
        <card title="饼图"><pie></pie></card>
        <card title="雷达图"><radar></radar></card>
        <card title="漏斗图"><funnel></funnel></card>
    </div>
</template>

<script>
import Card from './components/card';
import Bar from './components/bar';
import MyLine from './components/line';
import Pie from './components/pie';
import Radar from './components/radar';
import Funnel from './components/funnel';
export default {
    components: {
        Card,
        Bar,
        MyLine,
        Pie,
        Radar,
        Funnel,
    },
};
</script>
