const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const experimentSchema = new Schema({
    // 实验ID
    experiment_id:{
        type:Number
    },
    // 实验名称
    experiment_name:{
        type:String,
        required:true
    },
    // 实验路径
    experiment_url:{
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

const experimentModel = mongoose.model('experiment',experimentSchema);

module.exports = experimentModel;