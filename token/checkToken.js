const jwt = require('jsonwebtoken');

module.exports = async (ctx,next)=>{
    const authorization = ctx.get('authorization');
    if(authorization==''){
        ctx.throw(401,'no token detected in http server');
    }
    const token = authorization.split(' ')[1];
    let tokenContent;
    try {
        tokenContent = await jwt.verify(token);
    } catch (error) {
        ctx.throw(401,'invalid token');
    }
    await next();
}