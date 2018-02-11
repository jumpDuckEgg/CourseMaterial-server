const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coursewareSchema = new Schema({
    // 课件ID
    courseware_id: {
        type: Number
    },
    courseware_url: {
        type: String,
        required: true
    },
    courseware_name: {
        type: String
    },
    course_id: {
        type: Number,
        required: true
    }
});

const coursewareModel = mongoose.model('courseware', coursewareSchema);

module.exports = coursewareModel;