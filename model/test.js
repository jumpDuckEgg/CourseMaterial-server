const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    // 模拟试题ID
    test_id:{
        type:Number
    },
    // 模拟试题名称
    test_name:{
        type:String,
        required:true
    },
    // 模拟试题地址
    test_url:{
        type:String,
        required:true
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
const testModel = mongoose.model('test',testSchema);

module.exports = testModel;