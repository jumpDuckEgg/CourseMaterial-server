const commentController = require('../controller/comment.js');
const Router = require('koa-router');
const comment = new Router();

comment.post('/addComment',commentController.increaseComment);

comment.post('/findAllComment',commentController.getCommentByType);

module.exports = comment;