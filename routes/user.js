const Router = require('koa-router');
const userController = require('../controller/user.js');
const checkToken = require('../token/checkToken.js');
const user = new Router();
user.get('/', checkToken, userController.getAllUser);
user.get('/information', (ctx, next) => {
    ctx.body = "欢迎来到user的information"
});
user.post('/getUserInformation', userController.getUserInformation);

user.post('/updateUserInformation', userController.modifyUserInformation);

user.post('/favoriteCourse', userController.favoriteCourse);

user.post('/unfavoriteCourse', userController.unfavoriteCourse);

module.exports = user;