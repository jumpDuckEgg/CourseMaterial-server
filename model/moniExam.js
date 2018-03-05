const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moniExamSchema = new Schema({
    // 模拟试卷ID
    moniExam_id: {
        type: Number
    },
    // 模拟试卷标题
    moniExam_title: {
        type: String
    },
    // 模拟试卷内容
    moniExam_content: {
        type: Array
    },
    // 关联课程ID
    course_id: {
        type: Number,
        required: true
    },
    // 模拟试卷创建时间
    createdTime: {
        type: Date,
        default: new Date()
    },
    moniExam_isPublish: {
        type: Boolean,
        default: true
    }
});

const moniExamModel = mongoose.model('moniExam', moniExamSchema);

module.exports = moniExamModel;