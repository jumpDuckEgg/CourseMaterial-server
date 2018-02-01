const jwt = require('jsonwebtoken');
const config = require('../config/index.js');
module.exports = async (ctx,next)=>{
    const authorization = ctx.get('authorization');
    if(authorization==''){
        ctx.throw(401,'no token detected in http server');
    }
    const token = authorization.split(' ')[1];
    let tokenContent;
    try {
        tokenContent = await jwt.verify(token,config.TOKEN);
    } catch (error) {
        console.log(error)
        ctx.throw(401,'用户未授权');
    }
    await next();
}