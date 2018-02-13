const testModel = require('../model/test.js');

const addTests = (data)=>{
    return new Promise((resolve,reject)=>{
        testModel.insertMany(data, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}
const findTestById = (data)=>{
    return new Promise((resolve,reject)=>{
        testModel.findOne(data,(err,doc)=>{
            if(err){
                reject(err)
            }
            resolve(doc)
        })
    })
}

const removeTest = (data)=>{
    return new Promise((resolve,reject)=>{
        testModel.remove(data.params,(err)=>{
            if(err){
                reject(err);
            }
            resolve();
        })
    })
}

module.exports = {
    addTests,
    findTestById,
    removeTest
}