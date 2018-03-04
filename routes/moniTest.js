const moniTestController = require('../controller/moniTest.js');

const Router = require('koa-router');

const moniTest = new Router();

moniTest.post('/createMoniTest',moniTestController.createMoniTest);

module.exports = moniTest;