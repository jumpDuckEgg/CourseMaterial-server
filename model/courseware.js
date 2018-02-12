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
    }
});

const coursewareModel = mongoose.model('courseware', coursewareSchema);

module.exports = coursewareModel;