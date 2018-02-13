const coursewareModel = require('../model/courseware.js');

const addCourseware = (data) => {
    return new Pormise((resolve, reject) => {
        data.save(err => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}
const addCoursewares = (data) => {
    return new Promise((resolve, reject) => {
        coursewareModel.insertMany(data, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}

const findCoursewareById = (data)=>{
    return new Promise((resolve,reject)=>{
        coursewareModel.findOne(data,(err,doc)=>{
            if(err){
                reject(err);
            }
            resolve(doc);
        })
    })
}

const removeCourseware = (data)=>{
    return new Promise((resolve,reject)=>{
        coursewareModel.remove(data.params,(err)=>{
            if(err){
                reject()
            }
            resolve();
        })
    })
}

const increaseCourseware = async (ctx, next) => {

}

module.exports = {
    increaseCourseware,
    addCoursewares,
    findCoursewareById,
    removeCourseware
}