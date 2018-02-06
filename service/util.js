const config = require('../config/index.js');
const qiuniu = require('qiniu');

function qiniuToken(suffix) {
    let options = {
        scope: config.BUCKET,
        saveKey:"image/logo/$(etag)."+suffix,
        returnBody: '{"key":"http://p3psczqxy.bkt.clouddn.com/$(key)","hash":"$(etag)","fname":$(fname),"fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };
    let mac = new qiuniu.auth.digest.Mac(config.ACCESSKEY,config.SECRETKEY);
    let putPolicy = new qiuniu.rs.PutPolicy(options);   
    let uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
}

const uploadToken = async (ctx,next)=>{
    let suffix = ctx.request.body.suffix;
    let token  = await qiniuToken(suffix);
    ctx.body = {
        data:token,
        upload_url:config.UPLOAD_CLIENT
    }
}


module.exports = {
    uploadToken
}
