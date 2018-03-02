const commentController = require('../controller/comment.js');
const Router = require('koa-router');
const comment = new Router();

comment.post('/addComment', commentController.increaseComment);

comment.post('/findAllComment', commentController.getCommentByType);

comment.get('/getAllComment', commentController.getAllComment);

comment.post('/getAllCommentById', commentController.getAllCommentById);

comment.post('/modifyCommentPublish', commentController.modifyCommentPublish);

comment.post('/deleteComment', commentController.deleteComment);

comment.post('/getCommentLimit',commentController.getCommentLimit);

// 分页
comment.post('/getCommentSpecial',commentController.getCommentSpecial);

module.exports = comment;