import router from './router';
import { defaultRoutes } from './router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { getCookies } from '@/utils/base';
import store from './store';
import VueRouter from 'vue-router';

async function initRouter() {
    const token = await getCookies('token');
    if (token) {
        store.dispatch('user/info');
        // 查看用户权限
        store.dispatch('user/permission').then((res) => {
            // 生成我们路由
            router.$addRoutes(res);
        });
    }
}

// 添加自己方法，否则addRoutes没有删除路由中原来的路由，会出现duplicate named routes错误
router.$addRoutes = (params) => {
    router.matcher = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: defaultRoutes,
    }).matcher;
    router.addRoutes(params);
    router.addRoutes([
        {
            path: '*',
            name: 'NoFound',
            component: () =>
                import(
                    /* webpackChunkName: "common" */ '@/views/404/index.vue'
                ),
        },
    ]);
};

// 解决刷新后会404问题
router.onReady(() => {
    // 假如没有permission就重新获取
    if (store.state.user.permission.length <= 0) {
        initRouter();
    }
});

const whiteList = ['/login', '/register'];

router.beforeEach(async (to, from, next) => {
    Nprogress.start();
    document.title = to.meta.title || 'APP';
    const token = await getCookies('token');
    if (!token) {
        // 没有登陆状态
        // 假如是白名单中
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
            Nprogress.done();
        }
    } else {
        if (store.state.user.permission.length <= 0) {
            initRouter();
            next();
        } else {
            next();
        }
    }
});

router.afterEach(() => {
    Nprogress.done();
});
