import Vue from 'vue';
import VueRouter from 'vue-router';
import BaseLayout from '@/layouts/baseLayout';

Vue.use(VueRouter);
export const defaultRoutes = [
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
            {
                path: '/demo',
                name: 'ChatingBoard',
                component: BaseLayout,
                children: [
                    {
                        path: '/demo/chating-board',
                        name: 'ChatingBoard',
                        component: () =>
                            import('@/views/demo/chating-board/index.vue'),
                    },
                ],
            },
        ],
    },
    // {
    //     path: '*',
    //     name: 'NoFound',
    //     component: () =>
    //         import(/* webpackChunkName: "common" */ '../views/404/index.vue'),
    // },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: defaultRoutes,
});

export default router;
