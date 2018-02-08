const Router = require('koa-router');
const courseController = require('../controller/course.js');
const checkToken = require('../token/checkToken.js');
const course = new Router();

course.post('/createcourse', checkToken, courseController.IncreaseCourse);

course.get('/findallcourse', checkToken, courseController.getAllCourse);

course.post('/deletecourse', courseController.deleteCourse);

course.post('/updateCoursePublish', courseController.examineOneCourse);

course.post('/updateCourseDetail', courseController.updateCourse);

module.exports = course;
