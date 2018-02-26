const commentController = require('../controller/comment.js');
const Router = require('koa-router');
const comment = new Router();

comment.post('/addComment',commentController.increaseComment);

comment.post('/findAllComment',commentController.getCommentByType);

comment.get('/getAllComment',commentController.getAllComment);

comment.post('/modifyCommentPublish',commentController.modifyCommentPublish);

comment.post('/deleteComment',commentController.deleteComment);

module.exports = comment;