const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const videoSchema = new Schema({
    // 视频ID
    video_id:{
        type:Number
    },
    // 视频名字
    video_name:{
        type:String,
        required:true
    },
    // 视频路径
    video_url:{
        type:String,
        required:true
    },
    // 课程ID
    course_id:{
        type:Number,
        required:true
    }
})

const videoModel = mongoose.model('video',videoSchema);

module.exports = videoModel;