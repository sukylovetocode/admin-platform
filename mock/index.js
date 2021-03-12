/** 实现一个简单的mock服务器 */
const koa = require('koa');
const app = new koa();
const Router = require('koa-router');
const router = new Router();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

router.post('/api/user/login', (ctx) => {
    const roles = [
        {
            name: 'admin',
            pwd: 'admin',
        },
        {
            name: 'guest',
            pwd: 'guest',
        },
    ];
    roles.map((role) => {
        if (
            role.name === ctx.request.body.user &&
            role.pwd === ctx.request.body.pwd
        ) {
            ctx.body = {
                status: 200,
                info: {
                    name: 'admin',
                    avatar: '1.png',
                },
            };
        } else {
            ctx.body = {
                status: 200,
            };
        }
    });
});

router.get('/api/user/info', (ctx) => {
    ctx.body = {
        status: 200,
        info: {
            name: 'admin',
            avatar: '1.png',
        },
    };
});

router.get('/api/user/permission', (ctx) => {
    ctx.body = {
        status: 200,
        permissions: [
            {
                id: 1,
                path: '/features',
                pid: 0,
                menu: 1,
                meta: {
                    title: '功能',
                },
                topMenu: true,
                name: 'Features',
                component: 'BaseLayout',
            },
            {
                id: 2,
                path: '/features/lottie',
                pid: 1,
                menu: 1,
                topMenu: false,
                name: 'Lottie',
                meta: {
                    title: 'Lottie',
                    icon: 'el-icon-football',
                },
                component: 'Lottie',
            },
            {
                id: 3,
                path: '/charts',
                pid: 0,
                menu: 1,
                topMenu: true,
                meta: {
                    title: '可视化',
                },
                name: 'Charts',
                component: 'BaseLayout',
            },
            {
                id: 4,
                path: '/charts/echarts',
                pid: 3,
                menu: 1,
                topMenu: false,
                name: 'Echarts',
                meta: {
                    title: 'Echarts',
                    icon: 'el-icon-football',
                },
                component: 'defaultLayout',
            },
            {
                id: 5,
                path: '/charts/echarts/bar',
                pid: 4,
                menu: 1,
                name: 'Bar',
                topMenu: false,
                meta: {
                    title: 'Echarts_bar',
                    icon: 'el-icon-football',
                },
                component: 'Echarts_bar',
            },
            {
                id: 6,
                path: '/features/table',
                pid: 1,
                menu: 1,
                topMenu: false,
                name: 'custom-table',
                meta: {
                    title: '表格',
                    icon: 'el-icon-edit-outline',
                },
                component: 'Table',
            },
            {
                id: 7,
                path: '/features/editor',
                pid: 1,
                menu: 1,
                topMenu: false,
                name: 'Editor',
                meta: {
                    title: '编辑器',
                    icon: 'el-icon-edit',
                },
                component: 'Editor',
            },
            {
                id: 13,
                path: '/features/calendar',
                pid: 1,
                menu: 1,
                topMenu: false,
                name: 'Calendar',
                meta: {
                    title: '日历',
                    icon: 'el-icon-edit',
                },
                component: 'Calendar',
            },
            {
                id: 8,
                path: '/features/copypaste',
                pid: 1,
                menu: 1,
                topMenu: false,
                name: 'CopyPaste',
                meta: {
                    title: '复制粘贴',
                    icon: 'el-icon-scissors',
                },
                component: 'CopyPaste',
            },
            {
                id: 9,
                path: '/demo',
                pid: 0,
                menu: 1,
                topMenu: true,
                name: 'Demo',
                component: 'BaseLayout',
            },
            {
                id: 10,
                path: '/features/lazyimg',
                pid: 1,
                menu: 1,
                topMenu: false,
                name: 'LazyImg',
                meta: {
                    title: '懒加载',
                    icon: 'el-icon-scissors',
                },
                component: 'LazyImg',
            },
            {
                id: 11,
                path: '/features/excel',
                pid: 1,
                menu: 1,
                topMenu: false,
                name: 'Excel',
                meta: {
                    title: '表格',
                    icon: 'el-icon-menu',
                },
                component: 'Excel',
            },
            {
                id: 12,
                path: '/features/share',
                pid: 1,
                menu: 1,
                meta: {
                    title: '分享',
                    icon: 'el-icon-share',
                },
                topMenu: false,
                name: 'Share',
                component: 'Share',
            },
            {
                id: 14,
                path: '/features/model',
                pid: 1,
                menu: 1,
                meta: {
                    title: '模型渲染',
                    icon: 'el-icon-share',
                },
                topMenu: false,
                name: 'Model',
                component: 'Model',
            },
        ],
    };
});

app.listen(3000, () => {
    console.log('we are now listening to 3000');
});
