const onlineTestController = require('../controller/onlineTest.js');

const Router = require('koa-router');

const onlineTest = new Router();

const checkToken = require('../token/checkToken.js');

onlineTest.post('/addonlineTest',checkToken,onlineTestController.saveOnlineTest);

onlineTest.post('/findAllonlineTest',checkToken,onlineTestController.findAllOnlineTest);

onlineTest.post('/publishOnlineTest',checkToken,onlineTestController.modifyOnlineTest);

onlineTest.post('/removeOnlineTest',checkToken,onlineTestController.deleteOnlineTest);

onlineTest.post('/getOnlineTestById',checkToken,onlineTestController.getOnlineTestById);

module.exports = onlineTest;