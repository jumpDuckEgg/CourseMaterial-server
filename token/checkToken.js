const jwt = require('jsonwebtoken');
const config = require('../config/index.js');
const userController = require('../controller/user.js');
module.exports = async (ctx, next) => {
    const authorization = ctx.get('authorization');
    const userInfo = ctx.get('userinfo');
    if (authorization == '') {
        ctx.throw(401, 'no token detected in http server');
    }
    const token = authorization.split(' ')[1];
    const user_id = userInfo.split(' ')[1];
    const user_type = userInfo.split(' ')[3];
    const username = userInfo.split(' ')[5];
    let doc = await userController.findUserById({ user_id: user_id ,userType:user_type,username:username});
    if (!doc||doc.userType != user_type) {
        ctx.throw(408, '用户信息不正确，请重新登录');
    }
    let tokenContent;
    try {
        tokenContent = await jwt.verify(token, config.TOKEN);
    } catch (error) {
        console.log(error)
        ctx.throw(401, '用户未授权');
    }
    await next();
}