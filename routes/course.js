const Router = require('koa-router');
const courseController = require('../controller/course.js');
const checkToken = require('../token/checkToken.js');
const course = new Router();

course.post('/createcourse', checkToken, courseController.IncreaseCourse);

course.get('/findallcourse', checkToken, courseController.getAllCourse);

course.post('/deletecourse',checkToken, courseController.deleteCourse);

course.post('/updateCoursePublish',checkToken, courseController.examineOneCourse);

course.post('/updateCourseDetail',checkToken, courseController.updateCourse);

course.post('/findAllCourseIspublish',checkToken,courseController.getAllCourseByAuthor);

course.post('/findAllCourseByAuthor',checkToken,courseController.getAllCourseByAuthor);

course.post('/findCourseByParams',checkToken,courseController.getCourseByParams);

course.post('/addResources',checkToken,courseController.addResources);

course.post('/findallresource',checkToken,courseController.findResourcesByCourseId);

course.post('/removeOneResource',checkToken,courseController.removeResourcesByCourseId);

course.post('/getCourseLimit',checkToken,courseController.getCourseLimit);

module.exports = course;
