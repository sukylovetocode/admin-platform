import Vue from 'vue';
import VueRouter from 'vue-router';
import addRoute from './addRoute';

// 解决ElementUI导航中VUE-ROUTER在3.0版本重复点菜单报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

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
                path: '/oauth/redirect',
                name: 'redirect',
                component: () => import('@/views/Login/auth-redirect.vue'),
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
];
export const combineRoutes = [...defaultRoutes, ...addRoute];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: combineRoutes,
});

export default router;
