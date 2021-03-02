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
                token: 'adminLogin',
            };
        } else {
            ctx.body = {
                status: 200,
            };
        }
    });
});

app.listen(3000, () => {
    console.log('we are now listening to 3000');
});
