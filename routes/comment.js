const commentController = require('../controller/comment.js');
const Router = require('koa-router');
const comment = new Router();
const checkToken = require('../token/checkToken.js');

comment.post('/addComment', checkToken, commentController.increaseComment);

comment.post('/findAllComment', checkToken, commentController.getCommentByType);

comment.get('/getAllComment', checkToken, commentController.getAllComment);

comment.post('/getAllCommentById', checkToken, commentController.getAllCommentById);

comment.post('/modifyCommentPublish', checkToken, commentController.modifyCommentPublish);

comment.post('/deleteComment', checkToken, commentController.deleteComment);

comment.post('/getCommentLimit', checkToken, commentController.getCommentLimit);

comment.get('/getCommentLimitByAdmin', checkToken, commentController.getCommentLimitByAdmin);

// 分页
comment.post('/getCommentSpecial', checkToken, commentController.getCommentSpecial);

module.exports = comment;