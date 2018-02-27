const homeworkModel = require('../model/homework.js');
const result = require('../result/index.js');
const addHomeworks = (data) => {
    return new Promise((resolve, reject) => {
        homeworkModel.insertMany(data, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}

const findHomeworkById = (data) => {
    return new Promise((resolve, reject) => {
        homeworkModel.findOne(data, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}

const removeHomework = (data) => {
    return new Promise((resolve, reject) => {
        homeworkModel.remove(data.params, (err) => {
            if (err) {
                reject(err)
            }
            resolve();
        })
    })
}

const getHomeworkById = async (ctx, next) => {
    let data = {
        homework_id: ctx.request.body.homework_id
    }

    let doc = await findHomeworkById(data);
    result.HOMEWORK.FINDSUCCESS.data = doc;
    ctx.status = 200;
    ctx.body = result.HOMEWORK.FINDSUCCESS;

}


module.exports = {
    addHomeworks,
    findHomeworkById,
    removeHomework,
    getHomeworkById
}