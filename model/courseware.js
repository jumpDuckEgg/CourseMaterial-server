const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coursewareSchema = new Schema({
    // 课件ID
    courseware_id: {
        type: Number
    },
    // 课件路径
    courseware_url: {
        type: String,
        required: true
    },
    // 课件名字
    courseware_name: {
        type: String
    },
    // 课程ID
    course_id: {
        type: Number,
        required: true
    },
    // 创建时间
    createdTime:{
        type:Date,
        default:new Date()
    },
});

const coursewareModel = mongoose.model('courseware', coursewareSchema);

module.exports = coursewareModel;