const courseModel = require('../model/course.js');
const counterController = require('./counter.js');
const result = require('../result/index.js');
const AddCourse = (data) => {
    return new Promise((resolve, reject) => {
        data.save((err) => {
            if (err) {
                reject(err)
            }
            resolve();
        })
    })
}

const findAllCourse = () => {
    return new Promise((resolve, reject) => {
        courseModel.find({}, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        })
    })
}

const removeCourse = (data) => {
    return new Promise((resolve, reject) => {
        courseModel.findOneAndRemove(data, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    })
}

const updateOneCourse = (data) => {
    return new Promise((resolve, reject) => {
        courseModel.findOneAndUpdate(data.query, data.options, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}

const IncreaseCourse = async (ctx, next) => {
    let id = 0;
    await counterController.getNextCounterNum('course').then(res => {
        id = res.couterNum
    });
    let course = new courseModel({
        course_id: id,
        course_name: ctx.request.body.name,
        description: ctx.request.body.description,
        courseImage: ctx.request.body.imageUrl,
        course_declaration: ctx.request.body.docUrl,
        star: ctx.request.body.starNum,
        author: ctx.request.body.author
    });
    await AddCourse(course);
    ctx.status = 200;
    ctx.body = result.COURSE.CREATESUCCESS;
}

const getAllCourse = async (ctx, next) => {
    let doc = await findAllCourse();
    ctx.status = 200;
    result.COURSE.FINDALLSUCCESS.data = doc;
    ctx.body = result.COURSE.FINDALLSUCCESS;
}

const deleteCourse = async (ctx, next) => {
    let data = { course_id: ctx.request.body.course_id };
    let doc = await removeCourse(data);
    result.COURSE.REMOVESUCCESS.data = doc;
    ctx.body = result.COURSE.REMOVESUCCESS;
}

const examineOneCourse = async (ctx, next) => {
    let data = {
        query: ctx.request.body.query,
        options: ctx.request.body.options
    }
    await updateOneCourse(data);
    ctx.status = 200;
    ctx.body = result.COURSE.PASSCOURSE;
}

const updateCourse = async (ctx, next) => {
    let data = {
        query: ctx.request.body.query,
        options: ctx.request.body.options
    }
    await updateOneCourse(data);
    ctx.status = 200;
    ctx.body = result.COURSE.UPDATESUCCESS;
}

module.exports = {
    IncreaseCourse,
    getAllCourse,
    deleteCourse,
    examineOneCourse,
    updateCourse
}