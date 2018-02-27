const experimentModel = require('../model/experiment.js');
const result = require('../result/index.js');


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

const findExperimentById = (data) => {
    return new Promise((resolve, reject) => {
        experimentModel.findOne(data, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}

const removeExperiment = (data) => {
    return new Promise((resolve, reject) => {
        experimentModel.remove(data.params, (err) => {
            if (err) {
                reject(err)
            }
            resolve();
        })
    })
}

const getExperimentById = async (ctx, next) => {
    let data = {
        experiment_id: ctx.request.body.experiment_id
    }

    let doc =await findExperimentById(data);
    result.EXPERIMENT.FINDSUCCESS.data = doc;
    ctx.status = 200;
    ctx.body = result.EXPERIMENT.FINDSUCCESS;

}

module.exports = {
    addExperiments,
    findExperimentById,
    removeExperiment,
    getExperimentById
}