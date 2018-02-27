const testModel = require('../model/test.js');
const result = require('../result/index.js');

const addTests = (data) => {
    return new Promise((resolve, reject) => {
        testModel.insertMany(data, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}
const findTestById = (data) => {
    return new Promise((resolve, reject) => {
        testModel.findOne(data, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}

const removeTest = (data) => {
    return new Promise((resolve, reject) => {
        testModel.remove(data.params, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

const getTestById = async (ctx, next) => {
    let data = {
        test_id: ctx.request.body.test_id
    }

    let doc = await findTestById(data);
    result.TEST.FINDSUCCESS.data = doc;
    ctx.status = 200;
    ctx.body = result.TEST.FINDSUCCESS;

}


module.exports = {
    addTests,
    findTestById,
    removeTest,
    getTestById
}