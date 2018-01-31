const Router = require('koa-router');
const userController = require('../controller/user.js');
const user = new Router();
user.get('/',(ctx,next)=>{
    ctx.body="欢迎来到user"
});
user.get('/information',(ctx,next)=>{
    ctx.body = "欢迎来到user的information"
})
module.exports = user;