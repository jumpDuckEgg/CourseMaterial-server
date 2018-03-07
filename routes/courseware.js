const coursewareController = require('../controller/courseware.js');
const Router = require('koa-router');
const courseware  =  new Router();

const checkToken = require('../token/checkToken.js');

courseware.post('/addCourseware',checkToken,coursewareController.increaseCourseware);



module.exports = courseware;