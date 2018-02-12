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
const removeTest = (data)=>{

}

module.exports = {
    addTests
}