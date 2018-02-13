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

const findHomeworkById = (data)=>{
    return new Promise((resolve,reject)=>{
        homeworkModel.findOne(data,(err,doc)=>{
            if(err){
                reject(err)
            }
            resolve(doc)
        })
    })
}

const removeHomework = (data) =>{
    return new Promise((resolve,reject)=>{
        homeworkModel.remove(data.params,(err)=>{
            if(err){
                reject(err)
            }
            resolve();
        })
    })
}

module.exports={
    addHomeworks,
    findHomeworkById,
    removeHomework
}