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

const increaseCourseware = async (ctx, next) => {
    // let data = ctx.request.body;
    // await Promise.all(data.map(function (elem) {
    //     return counterController.getNextCounterNum('courseware')
    // })).then(function (result) {
    //     data.map((value, index) => {
    //         value.courseware_id = result[index].couterNum;
    //     });
    // }).catch(err => {
    //     console.log(err)
    // });
    // let doc = await addCoursewares(data);
    // let coursewares = [];
    // doc.map((value, index) => {
    //     coursewares.push(value.courseware_id)
    // })
    // let courseUpdate = {
    //     query: {
    //         course_id: data[0].course_id
    //     },
    //     options: {
    //         Coursewares: coursewares
    //     }
    // };
    // console.log(courseUpdate)
    // await courseController.updateOneCourse(courseUpdate);
    // ctx.status = 200;
    // ctx.body = result.COURSEWARE.CREATESUCCESS;

}

module.exports = {
    increaseCourseware,
    addCoursewares
}