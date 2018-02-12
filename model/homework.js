const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const homeworkSchema = new Schema({
    // 习题作业ID
    homework_id:{
        type:Number
    },
    // 习题作业名字
    homework_name:{
        type:String,
        required:true
    },
    // 习题作业路径
    homework_url:{
        type:String,
        required:true
    },
    // 课程ID
    course_id:{
        type:Number,
        required:true
    }
})

const homeworkModel = mongoose.model('homework',homeworkSchema);

module.exports = homeworkModel;