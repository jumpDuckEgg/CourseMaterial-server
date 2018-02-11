const coursewareModel = require('../model/courseware.js');
const counterController = require('./counter.js');
const result = require('../result/index.js');

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



const increaseCourseware = async (ctx, next) => {

    let data = ctx.request.body;
    await Promise.all(data.map(function (elem) {
        return counterController.getNextCounterNum('courseware')
    })).then(function (result) {
        data.map((value, index) => {
            value.course_id = result[index].couterNum;
        })
    }).catch(err => {
        console.log(err)
    })
 
    ctx.status = 200;
    ctx.body = result.COURSEWARE.CREATESUCCESS;


}

module.exports = {
    increaseCourseware
}