const moniTestController = require('../controller/moniTest.js');

const Router = require('koa-router');

const moniTest = new Router();

moniTest.post('/createMoniTest', moniTestController.createMoniTest);

moniTest.post('/getAllMoniTestByOptions',moniTestController.getAllMoniTestByOptions);

moniTest.post('/modifyMoniTest',moniTestController.modifyMoniTest);

moniTest.post('/deleteMoniTest',moniTestController.deleteMoniTest);

module.exports = moniTest;