import router from './router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { getCookies } from '@/utils/base';
import store from './store';

// 解决刷新后会404问题
router.onReady(() => {
    store.dispatch('user/info');
    // 查看用户权限
    store.dispatch('user/permission').then((res) => {
        // 生成我们路由
        router.addRoutes(res);
    });
});

const whiteList = ['/login', '/register'];

router.beforeEach(async (to, from, next) => {
    Nprogress.start();
    document.title = to.meta.title || 'APP';
    next();
    // 检测登录状态
    const token = await getCookies('token');
    if (token) {
        const hasPermission = store.getters.hasPermission.length > 0;
        if (hasPermission) {
            next();
        } else {
            // 查看用户信息
            store.dispatch('user/info');
            // 查看用户权限
            store.dispatch('user/permission').then((res) => {
                // 生成我们路由
                router.addRoutes(res);
                next();
            });
        }
    } else {
        // 没有登陆状态
        // 假如是白名单中
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
            Nprogress.done();
        }
    }
});

router.afterEach(() => {
    Nprogress.done();
});
