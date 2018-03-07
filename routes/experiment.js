const experimentController = require('../controller/experiment.js');
const Router = require('koa-router');

const experiment = new Router();

const checkToken = require('../token/checkToken.js');

experiment.post('/getExperimentById',checkToken,experimentController.getExperimentById);

module.exports = experiment;