const homeworkController = require('../controller/homework.js');

const Router = require('koa-router');

const homework = new Router();

const checkToken = require('../token/checkToken.js');

homework.post('/getHomeworkById',checkToken, homeworkController.getHomeworkById);

module.exports = homework;