const coursewareController = require('../controller/courseware.js');
const Router = require('koa-router');
const courseware  =  new Router();

courseware.post('/addCourseware',coursewareController.increaseCourseware);



module.exports = courseware;