const onlineTestController = require('../controller/onlineTest.js');

const Router = require('koa-router');

const onlineTest = new Router();

onlineTest.post('/addonlineTest',onlineTestController.saveOnlineTest);

onlineTest.post('/findAllonlineTest',onlineTestController.findAllOnlineTest);

onlineTest.post('/publishOnlineTest',onlineTestController.modifyOnlineTest);

onlineTest.post('/removeOnlineTest',onlineTestController.deleteOnlineTest);

module.exports = onlineTest;