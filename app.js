const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const config = require('./config/index.js')
const router = require('koa-router')();
const db = require('./db/index.js');
app.use(bodyParser());
// 监听请求
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

db.connect();

router.get('/',(ctx,next)=>{
    ctx.body="Hello world!"
})

// logger
// app.use(async (ctx, next) => {
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// });

app.use(router.routes(),router.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app