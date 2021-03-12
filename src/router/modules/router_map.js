import BaseLayout from '@/layouts/baseLayout';

const component_map = {
    Lottie: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/Lottie/index.vue'
        ),
    UtilsPackage: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/UtilsPackage/index.vue'
        ),
    BaseLayout: BaseLayout,
    defaultLayout: { render: (h) => h('router-view') },
    Echarts_bar: () =>
        import(
            /* webpackChunkName: "charts" */ '@/views/charts/echarts/barChart/index.vue'
        ),
    Table: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/Table/index.vue'
        ),
    Editor: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/Editor/index.vue'
        ),
    Calendar: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/Calendar/index.vue'
        ),
    CopyPaste: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/CopyPaste/index.vue'
        ),
    LazyImg: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/LazyImg/index.vue'
        ),
    Excel: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/Excel/index.vue'
        ),
    Share: () =>
        import(
            /* webpackChunkName: "features" */ '@/views/features/Share/index.vue'
        ),
    Model: () =>
        import(/* webpackChunkName: "features" */ '@/views/Model/index.vue'),
};

export default (component) => {
    return component_map[component] || null;
};
