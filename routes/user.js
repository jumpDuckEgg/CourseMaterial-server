const Router = require('koa-router');
const userController = require('../controller/user.js');
const checkToken = require('../token/checkToken.js');
const user = new Router();
user.get('/', checkToken, userController.getAllUser);
user.get('/information', (ctx, next) => {
    ctx.body = "欢迎来到user的information"
});
user.post('/getUserInformation', checkToken,userController.getUserInformation);

user.post('/updateUserInformation',checkToken, userController.modifyUserInformation);

user.post('/favoriteCourse',checkToken, userController.favoriteCourse);

user.post('/unfavoriteCourse',checkToken, userController.unfavoriteCourse);

user.post('/getUserCountNum',checkToken, userController.getUserCountNum);

user.post('/deleteUser',checkToken,userController.deleteUser);

user.post('/modifyUserPassword',checkToken,userController.modifyUserPassword);

user.get('/getUserNumData',checkToken,userController.getUserNumData);

module.exports = user;