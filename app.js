const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const config = require('./config/index.js')
const router = require('koa-router')();
// 跨域
const cors = require('@koa/cors');
//连接数据库
const db = require('./db/index.js');
const user = require('./routes/user.js');
const userController = require('./controller/user.js')

app.use(bodyParser());
// 监听请求
app.use(logger());
app.use(cors());
app.use(require('koa-static')(__dirname + '/public'));

db.connect();

router.get('/',(ctx,next)=>{
    ctx.body="Hello world!"
});
router.post('/login',userController.Login);

router.post('/register',userController.Register);

router.use('/user',user.routes(),user.allowedMethods());
//404页面
router.get('*', async (ctx, next) => {
    ctx.body = { status : 404 }
});

app.use(router.routes(),router.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
    
});

module.exports = app