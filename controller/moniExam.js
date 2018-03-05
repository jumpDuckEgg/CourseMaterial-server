const moniExamModel = require('../model/moniExam.js');
const result = require('../result/index.js');
const counterController = require('./counter.js');
const courseController = require('./course.js');

const addMoniExam = (data) => {
    return new Promise((resolve, reject) => {
        data.save(err => {
            if (err) {
                reject(err);
            }
            resolve()
        })
    })
}

const createdMoniExam = async (ctx, next) => {
    let id = 0;
    await counterController.getNextCounterNum('moniExam').then(res => {
        id = res.couterNum
    });

    let moniExamData = new moniExamModel({
        moniExam_id: id,
        moniExam_title: ctx.request.body.title,
        moniExam_content: ctx.request.body.content,
        course_id: ctx.request.body.course_id
    });
    await addMoniExam(moniExamData);
    let courseUpdate = {
        query: {
            course_id: ctx.request.body.course_id
        },
        options: {
            moniexams: { 'moniExam_id': id }
        }
    };
    await courseController.insertOneCourseArray(courseUpdate);
    ctx.status = 200;
    ctx.body = result.MONIEXAM.CREATESUCCESS;
}

module.exports = {
    createdMoniExam
}