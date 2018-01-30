const router = require('koa-router')();

router.get('/',(ctx,next)=>{
    ctx.body="欢迎来到user"
})