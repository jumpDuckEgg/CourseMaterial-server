const moniExamController = require('../controller/moniExam.js');
const Router = require('koa-router');

const moniExam = new Router();

moniExam.post("/createdMoniExam",moniExamController.createdMoniExam);

moniExam.post('/getAllMoniExamByOptions',moniExamController.getAllMoniExamByOptions);

moniExam.post('/modifyMoniExamByOptions',moniExamController.modifyMoniExamByOptions);

moniExam.post('/deleteMoniExam',moniExamController.deleteMoniExam);

module.exports = moniExam;