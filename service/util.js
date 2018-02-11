const config = require('../config/index.js');
const qiuniu = require('qiniu');

function qiniuToken(data) {
    let options = {
        scope: config.BUCKET,
        saveKey: data.type + "/$(fname)",
        returnBody: '{"key":"http://qiniu.fangunbayadan.cn/$(key)","hash":"$(etag)","fname":$(fname)}',
        callbackBodyType: 'application/json'
    };
    let mac = new qiuniu.auth.digest.Mac(config.ACCESSKEY, config.SECRETKEY);
    let putPolicy = new qiuniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
}

const uploadToken = async (ctx, next) => {
    let data = ctx.request.body;
    let token = await qiniuToken(data);
    ctx.body = {
        data: token,
        upload_url: config.UPLOAD_CLIENT
    }
}


module.exports = {
    uploadToken
}
