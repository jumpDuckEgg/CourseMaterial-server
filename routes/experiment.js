const experimentController = require('../controller/experiment.js');
const Router = require('koa-router');

const experiment = new Router();

experiment.post('/getExperimentById',experimentController.getExperimentById);

module.exports = experiment;