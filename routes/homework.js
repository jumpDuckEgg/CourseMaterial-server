const homeworkController = require('../controller/homework.js');

const Router = require('koa-router');

const homework = new Router();

homework.post('/getHomeworkById', homeworkController.getHomeworkById);

module.exports = homework;