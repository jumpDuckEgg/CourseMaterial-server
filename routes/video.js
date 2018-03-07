const videoController = require('../controller/video.js');
const Router = require('koa-router');
const checkToken = require('../token/checkToken.js');
const video = new Router();

video.post('/findVideo',checkToken,videoController.getVideoById);

module.exports = video;
