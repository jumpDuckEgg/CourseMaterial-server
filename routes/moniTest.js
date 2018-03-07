const moniTestController = require('../controller/moniTest.js');

const Router = require('koa-router');

const moniTest = new Router();

const checkToken = require('../token/checkToken.js');

moniTest.post('/createMoniTest', checkToken, moniTestController.createMoniTest);

moniTest.post('/getAllMoniTestByOptions', checkToken, moniTestController.getAllMoniTestByOptions);

moniTest.post('/modifyMoniTest', checkToken, moniTestController.modifyMoniTest);

moniTest.post('/deleteMoniTest', checkToken, moniTestController.deleteMoniTest);

module.exports = moniTest;