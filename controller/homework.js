const homeworkModel = require('../model/homework.js');

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

module.exports={
    addHomeworks
}