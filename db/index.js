const mongoose = require('mongoose');
const config = require('../config/index.js');

function connect(){
    mongoose.connect(config.MONGODB.uri,(error)=>{
        if(error){
            throw error;
        }else{
            console.log("连接数据库成功")
        }
    })
}
module.exports ={
    connect
}