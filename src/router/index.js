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
        component: BaseLayout,
        children: [
            {
                path: '/',
                redirect: '/dashboard/copypaste',
            },
            {
                path: '/dashboard/utilspackage',
                name: 'UtilsPackage',
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ '../views/features/UtilsPackage/index.vue'
                    ),
            },
            {
                path: '/dashboard/copypaste',
                name: 'CopyPaste',
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ '../views/features/CopyPaste/index.vue'
                    ),
            },
            {
                path: '/dashboard/richtext',
                name: 'RichText',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ '../views/features/RichText/RichText.vue'
                    ),
            },
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: defaultRoutes,
});

router.addRoutes(asyncRoutes)

export default router;
