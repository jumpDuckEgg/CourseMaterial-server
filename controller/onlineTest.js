const onlineTestModel = require('../model/onlineTest.js');
const counterController = require('./counter.js');
const result = require('../result/index.js');
const courseController = require('./course.js');

const addOnlineTest = (data) => {
    return new Promise((resolve, reject) => {
        data.save(err => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

const findOnlineTestById = (data) => {
    return new Promise((resolve, reject) => {
        onlineTestModel.findOne(data, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        })
    })
}

const updateOneOnlineTest = (data) => {
    return new Promise((resolve, reject) => {
        onlineTestModel.findOneAndUpdate(data.query, data.options, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

const removeOneOnlineTest = (data) => {
    return new Promise((resolve, reject) => {
        onlineTestModel.remove(data.query, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}


const saveOnlineTest = async (ctx, next) => {
    let title = ctx.request.body.title;
    let course_id = ctx.request.body.course_id;
    let question = ctx.request.body.question;
    console.log(title, course_id, question);
    let id = 0;
    await counterController.getNextCounterNum('onlineTest').then(res => {
        id = res.couterNum
    });
    let onlineTest = new onlineTestModel({
        onlineTest_id: id,
        onlineTest_title: title,
        onlineTest_content: question,
        course_id: course_id
    })
    await addOnlineTest(onlineTest);

    let courseUpdate = {
        query: {
            course_id: course_id
        },
        options: {
            onlineTests: { 'onlineTest_id': id }
        }
    };
    await courseController.insertOneCourseArray(courseUpdate);
    ctx.status = 200;
    ctx.body = result.ONLINETEST.CREATESUCCESS;
}

const findAllOnlineTest = async (ctx, next) => {
    let query = ctx.request.body.query;
    let doc = await courseController.findAllCourse(query);
    let resourses = [];
    if (doc[0].onlineTests.length > 0) {
        await Promise.all(doc[0].onlineTests.map((value, index) => {
            return findOnlineTestById({ 'onlineTest_id': value.onlineTest_id })
        })).then(result => {
            resourses = result;
        })
    }
    result.ONLINETEST.FINDSUCCESS.data = resourses;
    ctx.status = 200;
    ctx.body = result.ONLINETEST.FINDSUCCESS;
}


const modifyOnlineTest = async (ctx, next) => {
    let data = {
        query: ctx.request.body.query,
        options: ctx.request.body.options
    }
    await updateOneOnlineTest(data);
    ctx.status = 200;
    ctx.body = result.ONLINETEST.MODIFYSUCCESS;
}

const deleteOnlineTest = async (ctx, next) => {
    let data = {
        query: { onlineTest_id: ctx.request.body.onlineTest_id }
    }
    await removeOneOnlineTest(data);
    let courseUpdate = {
        query: {
            course_id: ctx.request.body.course_id
        },
        options: {
            onlineTests: { 'onlineTest_id': ctx.request.body.onlineTest_id }
        }
    }
    await courseController.removeOneCourseArray(courseUpdate);

    ctx.status = 200;
    ctx.body = result.ONLINETEST.REMOVESUCCESS;
}

module.exports = {
    saveOnlineTest,
    findAllOnlineTest,
    modifyOnlineTest,
    deleteOnlineTest
}