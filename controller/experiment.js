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

module.exports={
    addExperiments
}