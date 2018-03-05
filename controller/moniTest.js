const moniTestModel = require('../model/moniTest.js');
const counterController = require('./counter.js');
const result = require('../result/index.js');


// 创建模拟试题
const addMoniTest = (data) => {
    return new Promise((resolve, reject) => {
        data.save((err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

// 查找模拟试题
const findAllMoniTestByOptions = (data) => {
    return new Promise((resolve, reject) => {
        moniTestModel.find(data.query, (err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs);
        })
    })
}

// 修改模拟试题
const updateMoniTest = (data) => {
    return new Promise((resolve, reject) => {
        moniTestModel.updateOne(data.query, data.options, (err, raw) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

// 删除模拟试题
const removeMoniTest = (data) => {
    return new Promise((resolve, reject) => {
        moniTestModel.remove(data, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}



// 创建模拟试题
const createMoniTest = async (ctx, next) => {
    let id = 0;
    await counterController.getNextCounterNum('moniTest').then(res => {
        id = res.couterNum
    });
    let moniTest = new moniTestModel({
        moniTest_id: id,
        courseid: ctx.request.body.courseid,
        moniTest_title: ctx.request.body.moniTest_title,
        moniTest_answer: ctx.request.body.moniTest_answer,
        moniTest_level: ctx.request.body.moniTest_level,
        moniTest_score: ctx.request.body.moniTest_score,
        moniTest_analysis: ctx.request.body.moniTest_analysis,
        moniTest_optionsData: ctx.request.body.moniTest_optionsData,
        moniTest_type: ctx.request.body.moniTest_type
    });
    await addMoniTest(moniTest);
    ctx.status = 200;
    ctx.body = result.MONITEST.CREATESUCCESS;
}


// 获取全部模拟试题通过参数
const getAllMoniTestByOptions = async (ctx, next) => {
    let data = {
        query: {
            courseid: ctx.request.body.courseid
        }
    }
    let docs = await findAllMoniTestByOptions(data);
    result.MONITEST.FINDALLSUCCESS.data = docs;
    ctx.status = 200;
    ctx.body = result.MONITEST.FINDALLSUCCESS;
}
// 修改模拟试题
const modifyMoniTest = async (ctx, next) => {
    let data = {
        query: ctx.request.body.query,
        options: ctx.request.body.options
    }

    await updateMoniTest(data);
    ctx.status = 200;
    ctx.body = result.MONITEST.UPDATESUCCESS;
}

// 删除模拟试题

const deleteMoniTest = async (ctx, next) => {
    let data = {
        moniTest_id: ctx.request.body.moniTest_id
    }
    await removeMoniTest(data);
    ctx.status = 200;
    ctx.body = result.MONITEST.DELETESUCCESS;
}

module.exports = {
    createMoniTest,
    getAllMoniTestByOptions,
    modifyMoniTest,
    deleteMoniTest
}


