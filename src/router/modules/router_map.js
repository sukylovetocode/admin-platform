import BaseLayout from '@/layouts/baseLayout';

const component_map = {
    BaseLayout: BaseLayout,
    defaultLayout: { render: (h) => h('router-view') },
    DragEditor: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/demo/DragEditor/index.vue'
        ),
    EchartsBase: () =>
        import(
            /* webpackChunkName: "visualization" */ '@/views/Visualization/Charts/echarts/index.vue'
        ),
    Chart1: () =>
        import(
            /* webpackChunkName: "visualization" */ '@/views/Visualization/Charts/d3/index.vue'
        ),
    Table: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/Table/index.vue'
        ),
    ChangeTexture: () =>
        import(
            /* webpackChunkName: "visualization" */ '@/views/Visualization/3D/Model/index.vue'
        ),
};

export default (component) => {
    return component_map[component] || null;
};
