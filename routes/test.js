const testController = require('../controller/test.js');

const Router = require('koa-router');

const test = new Router();

test.post('/getTestById', testController.getTestById);

module.exports = test;