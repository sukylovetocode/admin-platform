// NOTE https://github.com/ecomfe/vue-echarts
import Vue from 'vue';
import Echarts from 'vue-echarts';
import { use } from 'echarts/core';
//按需引入
import { CanvasRenderer } from 'echarts/renderers';

import {
    BarChart,
    LineChart,
    PieChart,
    RadarChart,
    FunnelChart,
    CandlestickChart,
} from 'echarts/charts';
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
    DataZoomComponent,
} from 'echarts/components';

use([
    CanvasRenderer,
    BarChart,
    LineChart,
    PieChart,
    RadarChart,
    FunnelChart,
    CandlestickChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
    DataZoomComponent,
]);

Vue.component('v-chart', Echarts);
