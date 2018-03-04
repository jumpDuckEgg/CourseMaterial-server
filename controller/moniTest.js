const moniTestModel = require('../model/moniTest.js');
const counterController = require('./counter.js');
const result = require('../result/index.js');


// 创建模拟试题
const addMoniTest = (data)=>{
    return new Promise((resolve,reject)=>{
        data.save((err)=>{
            if(err){
                reject(err);
            }
            resolve();
        })
    })
}





// 创建模拟试题
const createMoniTest = async(ctx,next)=>{
    let id = 0;
    await counterController.getNextCounterNum('moniTest').then(res => {
        id = res.couterNum
    });
    let moniTest = new moniTestModel({
        moniTest_id:id,
        courseid:ctx.request.body.courseid,
        moniTest_title:ctx.request.body.moniTest_title,
        moniTest_answer:ctx.request.body.moniTest_answer,
        moniTest_level:ctx.request.body.moniTest_level,
        moniTest_score:ctx.request.body.moniTest_score,
        moniTest_analysis:ctx.request.body.moniTest_analysis,
        moniTest_optionsData:ctx.request.body.moniTest_optionsData,
        moniTest_type:ctx.request.body.moniTest_type
    });
    await addMoniTest(moniTest);
    ctx.status = 200;
    ctx.body = result.MONITEST.CREATESUCCESS;
}


module.exports = {
    createMoniTest
}


