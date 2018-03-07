const testController = require('../controller/test.js');

const Router = require('koa-router');
const checkToken = require('../token/checkToken.js');
const test = new Router();

test.post('/getTestById', checkToken,testController.getTestById);

module.exports = test;