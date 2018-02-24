const videoController = require('../controller/video.js');
const Router = require('koa-router');

const video = new Router();

video.post('/findVideo',videoController.getVideoById);

module.exports = video;
