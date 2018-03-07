const moniExamController = require('../controller/moniExam.js');
const Router = require('koa-router');

const moniExam = new Router();

const checkToken = require('../token/checkToken.js');

moniExam.post("/createdMoniExam", checkToken, moniExamController.createdMoniExam);

moniExam.post('/getAllMoniExamByOptions', checkToken, moniExamController.getAllMoniExamByOptions);

moniExam.post('/modifyMoniExamByOptions', checkToken, moniExamController.modifyMoniExamByOptions);

moniExam.post('/deleteMoniExam', checkToken, moniExamController.deleteMoniExam);

module.exports = moniExam;