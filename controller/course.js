const courseModel = require('../model/course.js');
const counterController = require('./counter.js');
const result = require('../result/index.js');
const AddCourse = (data) => {
    return new Promise((resolve, reject) => {
        data.save((err) => {
            if (err) {
                reject(err)
            }
            resolve();
        })
    })
}

const findAllCourse = () =>{
    return new Promise((resolve,reject)=>{
        courseModel.find({},(err,res)=>{
            if(err){
                reject(err);
            }
            resolve(res);
        })
    })
}

const IncreaseCourse = async (ctx, next) => {
    let id = 0;
    await counterController.getNextCounterNum('course').then(res => {
        id = res.couterNum
    });
    let course = new courseModel({
        course_id: id,
        course_name: ctx.request.body.name,
        description: ctx.request.body.description,
        courseImage: ctx.request.body.imageUrl,
        course_declaration: ctx.request.body.docUrl,
        star: ctx.request.body.starNum,
        author: ctx.request.body.author
    });
    await AddCourse(course);
    console.log("创建课程成功");
    ctx.status = 200;
    ctx.body = result.COURSE.CREATESUCCESS;
}

const getAllCourse = async (ctx,next)=>{
    let doc = await findAllCourse();
    ctx.status = 200;
    result.COURSE.FINDALLSUCCESS.data = doc;
    ctx.body = result.COURSE.FINDALLSUCCESS;
}


module.exports = {
    IncreaseCourse,
    getAllCourse
}