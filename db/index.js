const mongoose = require('mongoose');
const config = require('../config/index.js');
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
function connect(){
    mongoose.connect(config.MONGODB.uri,(error)=>{
        if(error){
            console.log('数据库连接失败，请查看数据库是否打开');
            throw error;
        }else{
            console.log("连接数据库成功");
        }
    })
}
module.exports ={
    connect
}