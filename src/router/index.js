import Vue from 'vue';
import VueRouter from 'vue-router';
import BaseLayout from '@/layouts/baseLayout';

Vue.use(VueRouter);

const defaultRoutes = [
    {
        path: '/',
        component: { render: (h) => h('router-view') },
        children: [
            {
                path: '/',
                redirect: '/login',
            },
            {
                path: '/login',
                name: 'Login',
                meta: {
                    title: '登录',
                },
                component: () =>
                    import(
                        /* webpackChunkName: "default" */ '../views/Login/index.vue'
                    ),
            },
            {
                path: '/register',
                name: 'Register',
                meta: {
                    title: '注册',
                },
                component: () =>
                    import(
                        /* webpackChunkName: "default" */ '../views/Register/index.vue'
                    ),
            },
        ],
    },
    {
        path: '*',
        name: 'NoFound',
        component: () =>
            import(/* webpackChunkName: "common" */ '../views/404/index.vue'),
    },
];
export const asyncRoutes = [
    {
        path: '/dashboard',
        name: 'Home',
        meta: {},
        component: BaseLayout,
        children: [
            {
                path: '/',
                redirect: '/dashboard/features/lottie',
            },
            {
                path: '/dashboard/features',
                component: { render: (h) => h('router-view') },
                name: 'features',
                meta: {},
                children: [
                    {
                        path: '/',
                        redirect: '/dashboard/features/lottie',
                    },
                    {
                        path: '/dashboard/features/lottie',
                        name: 'Lottie',
                        meta: {
                            title: 'Lottie动画',
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "features" */ '../views/features/Lottie/index.vue'
                            ),
                    },
                    {
                        path: '/dashboard/features/utilspackage',
                        name: 'UtilsPackage',
                        meta: {
                            title: '常用函数',
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "features" */ '../views/features/UtilsPackage/index.vue'
                            ),
                    },
                    {
                        path: '/dashboard/features/copypaste',
                        name: 'CopyPaste',
                        meta: {
                            title: '复制粘贴',
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "fetures" */ '../views/features/CopyPaste/index.vue'
                            ),
                    },
                    {
                        path: '/dashboard/features/richtext',
                        name: 'RichText',
                        meta: {
                            title: '富文本编辑器',
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "features" */ '../views/features/RichText/index.vue'
                            ),
                    },
                    {
                        path: '/dashboard/features/markdown',
                        name: 'Markdown',
                        meta: {
                            title: 'MD编辑器',
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "features" */ '../views/features/Markdown/index.vue'
                            ),
                    },
                    {
                        path: '/dashboard/features/excel',
                        name: 'Excel',
                        meta: {
                            title: '表格',
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "fetures" */ '../views/features/Excel/index.vue'
                            ),
                    },
                ],
            },
            {
                path: '/dashboard/charts',
                component: { render: (h) => h('router-view') },
                meta: {},
                children: [
                    {
                        path: '/',
                        redirect: '/dashboard/charts/barchart',
                    },
                    {
                        path: '/dashboard/charts/barchart',
                        name: 'BarChart',
                        meta: {
                            title: '柱状图',
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "charts" */ '../views/charts/echarts/barChart/index.vue'
                            ),
                    },
                ],
            },
            {
                path: '/dashboard/demo',
                component: { render: (h) => h('router-view') },
                children: [
                    {
                        path: '/dashboard/demo/imglazy',
                        name: 'ImgLazy',
                        meta: {
                            title: '图片懒加载',
                        },
                        component: () =>
                            import(
                                /* webpackChunkName: "demo" */ '../views/demo/lazyImg/index.vue'
                            ),
                    },
                ],
            },
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: defaultRoutes,
});

router.addRoutes(asyncRoutes);

export default router;
