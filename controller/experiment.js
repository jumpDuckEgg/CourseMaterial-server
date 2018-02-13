const experimentModel = require('../model/experiment.js');

const addExperiments = (data) => {
    return new Promise((resolve, reject) => {
        experimentModel.insertMany(data, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}

const findExperimentById = (data)=>{
    return new Promise((resolve,reject)=>{
        experimentModel.findOne(data,(err,doc)=>{
            if(err){
                reject(err)
            }
            resolve(doc)
        })
    })
}

const removeExperiment = (data)=>{
    return new Promise((resolve,reject)=>{
        experimentModel.remove(data.params,(err)=>{
            if(err){
                reject(err)
            }
            resolve();
        })
    })
}

module.exports={
    addExperiments,
    findExperimentById,
    removeExperiment
}