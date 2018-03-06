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

const findAllExamByOptions = (data) => {
    return new Promise((resolve, reject) => {
        moniExamModel.find(data.query, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        })
    })
}

const updateMoniExamByOptions = (data) => {
    return new Promise((resolve, reject) => {
        moniExamModel.update(data.query, data.options, (err, raw) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

const removeMoniExam = (data) => {
    return new Promise((resolve, reject) => {
        moniExamModel.remove(data, (err) => {
            if (err) {
                reject(err);
            }
            resolve()
        })
    })
}

//创建模拟试卷
const createdMoniExam = async (ctx, next) => {
    let id = 0;
    await counterController.getNextCounterNum('moniExam').then(res => {
        id = res.couterNum
    });

    let moniExamData = new moniExamModel({
        moniExam_id: id,
        moniExam_title: ctx.request.body.title,
        moniExam_content: ctx.request.body.content,
        course_id: ctx.request.body.course_id,
        moniTests: ctx.request.body.moniTests
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


// 获取模拟试卷
const getAllMoniExamByOptions = async (ctx, next) => {
    let data = {
        query: ctx.request.body.query
    }
    let docs = await findAllExamByOptions(data);
    result.MONIEXAM.FINDALLSUCCESS.data = docs;
    ctx.status = 200;
    ctx.body = result.MONIEXAM.FINDALLSUCCESS;
}

// 更新模拟试卷
const modifyMoniExamByOptions = async (ctx, next) => {
    let data = {
        query: ctx.request.body.query,
        options: ctx.request.body.options
    }
    await updateMoniExamByOptions(data);
    ctx.status = 200;
    ctx.body = result.MONIEXAM.UPDATESUCCESS;
}

// 删除模拟试卷
const deleteMoniExam = async (ctx, next) => {
    let data = {
        moniExam_id: ctx.request.body.moniExam_id
    }
    await removeMoniExam(data);

    let courseUpdate = {
        query: {
            course_id: ctx.request.body.course_id
        },
        options: {
            moniexams: { 'moniExam_id': ctx.request.body.moniExam_id }
        }
    }
    await courseController.removeOneCourseArray(courseUpdate);

    ctx.status = 200;
    ctx.body = result.MONIEXAM.DELETESUCCESS;
}

module.exports = {
    createdMoniExam,
    getAllMoniExamByOptions,
    modifyMoniExamByOptions,
    deleteMoniExam
}