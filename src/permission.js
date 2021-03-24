import router from './router';
import { combineRoutes } from './router';
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
        routes: combineRoutes,
    }).matcher;
    router.addRoutes(params);
    // 必须放最后
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
        console.log('第一次');
        initRouter();
    }
});

const whiteList = ['/login', '/register', '/oauth/redirect'];

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
            console.log('第2次');
            // 检测是否刷新进入的页面
            if (window.performance.navigation.type !== 1) {
                initRouter();
            }
            next();
        } else {
            next();
        }
    }
});

router.onError((error) => {
    console.log(error);
});

router.afterEach(() => {
    Nprogress.done();
});
