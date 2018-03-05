const moniExamController = require('../controller/moniExam.js');
const Router = require('koa-router');

const moniExam = new Router();

moniExam.post("/createdMoniExam",moniExamController.createdMoniExam);

module.exports = moniExam;