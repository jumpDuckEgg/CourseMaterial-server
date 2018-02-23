const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const onlineTestSchema = new Schema({
    // 在线测试ID
    onlineTest_id:{
        type:Number
    },
    // 在线测试标题
    onlineTest_title:{
        type:String,
        required:true
    },
    // 在线测试试题内容
    onlineTest_content:{
        type:Array
    },
    // 在线测试发布
    onlineTest_publish:{
        type:Boolean,
        default:false,
    },
    // 课程ID
    course_id:{
        type:Number,
        required:true
    },
    // 创建时间
    createdTime:{
        type:Date,
        default:new Date()
    },
})

const onlineTestModel = mongoose.model('onlineTest',onlineTestSchema);

module.exports = onlineTestModel;