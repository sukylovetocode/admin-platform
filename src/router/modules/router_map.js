import BaseLayout from '@/layouts/baseLayout';

const component_map = {
    BaseLayout: BaseLayout,
    defaultLayout: { render: (h) => h('router-view') },
    //Features
    DragEditor: () =>
        import(
            /* webpackChunkName: "demo" */ '@/views/demo/DragEditor/index.vue'
        ),
    Chating: () =>
        import(/* webpackChunkName: "demo" */ '@/views/demo/Chating/index.vue'),
    EchartsBase: () =>
        import(
            /* webpackChunkName: "visualization" */ '@/views/Visualization/Charts/echarts/index.vue'
        ),
    Chart1: () =>
        import(
            /* webpackChunkName: "visualization" */ '@/views/Visualization/Charts/d3/index.vue'
        ),
    //Features
    Table: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/Table/index.vue'
        ),
    Mask: () =>
        import(
            /* webpackChunkName: "visualization" */ '@/views/features/Mask/index.vue'
        ),
    Calendar: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/Calendar/index.vue'
        ),
    Editor: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/Editor/index.vue'
        ),
    CopyPaste: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/CopyPaste/index.vue'
        ),
    Gantt: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/Gantt/index.vue'
        ),
    Excel: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/Excel/index.vue'
        ),
    ChangeTexture: () =>
        import(
            /* webpackChunkName: "visualization" */ '@/views/Visualization/3D/Model/index.vue'
        ),
    Stock: () =>
        import(
            /* webpackChunkName: "visualization" */ '@/views/Visualization/Charts/echarts/stock.vue'
        ),
};

export default (component) => {
    return component_map[component] || null;
};
