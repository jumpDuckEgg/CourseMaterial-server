const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const onlineTestSchema = new Schema({
    // 在线测试ID
    onlineTest_id:{
        type:Number
    },
    onlineTest_title:{
        type:String,
        required:true
    },
    // 在线测试内容
    onlineTest_content:{
        type:Array
    },
    // 课程ID
    course_id:{
        type:Number,
        required:true
    }
})

const onlineTestModel = mongoose.model('onlineTest',onlineTestSchema);

module.exports = onlineTestModel;