const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const config = require('./config/index.js')
const router = require('koa-router')();
// 处理文件上传
const multer = require('koa-multer');
const upload = multer({ dest: './public/upload' });
// 跨域
const cors = require('@koa/cors');
//连接数据库
const db = require('./db/index.js');
const user = require('./routes/user.js');
const course = require('./routes/course.js');
const courseware = require('./routes/courseware.js');
const onlineTest = require('./routes/onlineTest.js');
const userController = require('./controller/user.js')
const counterController = require('./controller/counter.js');

app.use(bodyParser());

// 获得七牛云token
const util = require('./service/util.js');
// 监听请求
app.use(logger());
app.use(cors());
app.use(require('koa-static')(__dirname + '/public'));

db.connect();

// 初始化计数器
counterController.init();

router.get('/', (ctx, next) => {
    ctx.body = "Hello world!"
});
router.post('/login', userController.Login);

router.post('/register', userController.Register);

router.use('/user', user.routes(), user.allowedMethods());

router.use('/course', course.routes(), course.allowedMethods());

router.use('/courseware', courseware.routes(), courseware.allowedMethods());

router.use('/onlineTest', onlineTest.routes(), onlineTest.allowedMethods());

// router.post('/upload', upload.single('courseImage'), function (ctx, next) {
//     ctx.body = "ok"
// });

router.post('/uploadtoken', util.uploadToken);

//404页面
router.get('*', async (ctx, next) => {
    ctx.body = { status: 404 }
});

app.use(router.routes(), router.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);

});

module.exports = app