import router from './router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
// import { getCookies } from '@/utils/base';

router.beforeEach((to, from, next) => {
    Nprogress.start();
    document.title = to.meta.title || 'APP';
    next()
    // 检测登录状态
    // const token = getCookies('token');
    // if (token) {
    //     next();
    //     Nprogress.done();
    // } else {
    //     if (to.path !== '/login') {
    //         console.log(to.path);
    //         next({ path: '/login' });
    //         Nprogress.done();
    //     } else {
    //         next();
    //     }
    // }
});

router.afterEach(() => {
    Nprogress.done();
});
