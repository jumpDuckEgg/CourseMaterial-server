const userModel = require('../model/user.js');
const counterController = require('./counter.js');
const commentModel = require('../model/comment.js');
// 转换时间格式
const moment = require('moment');
// 把objectId转换成时间
const objectIdToTimestamp = require('objectid-to-timestamp');
// 加密
const Hashes = require('jshashes');

//状态
const result = require('../result/index.js');

//生成token
const createToken = require('../token/createToken.js');


// 特殊添加的修改评论
const updateComments = (data) => {
    return new Promise((resolve, reject) => {
        commentModel.updateMany(data.query, data.update, (err, raw) => {
            if (err) {
                reject(err)
            }
            resolve();
        })
    })
}



// 查找用户
const findUser = function (username) {
    return new Promise((resolve, reject) => {
        userModel.findOne({ username }, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        })
    })
}
// 查找用户ByID
const findUserById = function (data) {
    return new Promise((resolve, reject) => {
        userModel.findOne(data, { token: 0, password: 0 }, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        })
    })
}

// 更新用户信息
const upadateUser = function (data) {
    return new Promise((resolve, reject) => {
        userModel.findOneAndUpdate(data.query, data.update, { token: 0, password: 0 }, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}


// 添加用户
const AddUser = function (data) {
    return new Promise((resolve, reject) => {
        data.save((err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}


// 修改用户数组属性：插入
const insertUserComment = function (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        userModel.update(data.query, { $push: data.options }, (err, raw) => {
            if (err) {
                reject();
            }
            resolve();
        })
    })
}

// 修改用户数组属性：删除
const removeUserComment = function (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        userModel.update(data.query, { $pull: data.options }, (err, raw) => {
            if (err) {
                reject();
            }
            resolve();
        })
    })
}


//找到全部用户信息
const findAllUsers = function (data) {
    return new Promise((resolve, reject) => {
        userModel.find({}, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}
//登陆接口

const Login = async (ctx, next) => {
    let username = ctx.request.body.username;
    let password = new Hashes.SHA1().b64(ctx.request.body.password);
    let doc = await findUser(username);
    // console.log(doc)
    if (!doc) {
        console.log('检查到用户名不存在');
        ctx.status = 200;
        ctx.body = result.LOGIN.NOEXIST;

    } else if (doc.password === password) {
        // 生成一个新的token
        let token = createToken(username);
        doc.token = token;
        console.log(doc)
        await AddUser(doc);
        ctx.status = 200;
        result.LOGIN.SUCCESS.data = {
            token: token,
            username: username,
            userType: doc.userType,
            userImage: doc.userImage,
            user_id: doc.user_id
        }
        ctx.body = result.LOGIN.SUCCESS;
    } else {
        ctx.status = 200;
        ctx.body = result.LOGIN.FAIL;
    }
}
//注册接口
const Register = async (ctx, next) => {
    let id = 0;
    await counterController.getNextCounterNum('user').then(res => {
        id = res.couterNum
    });
    let user = new userModel({
        username: ctx.request.body.username,
        password: new Hashes.SHA1().b64(ctx.request.body.password), //加密
        token: createToken(this.username), //创建token并存入数据库
        userType: ctx.request.body.userType || 0,
        user_id: id
    });
    //将objectid转换为用户创建时间(可以不用)
    user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');

    let doc = await findUser(user.username);
    if (doc) {
        console.log('检查到用户名已存在');
        ctx.status = 200;
        ctx.body = result.REGISTER.EXIST;
    } else {
        await AddUser(user);
        console.log("注册用户成功");
        ctx.status = 200;
        ctx.body = result.REGISTER.SUCCESS;
    }
}

//获取全部用户
const getAllUser = async (ctx, next) => {
    let doc = await findAllUsers();
    ctx.status = 200;
    result.USERINFO.FINDALL.data = doc;
    ctx.body = result.USERINFO.FINDALL;
}

// 获取用户信息
const getUserInformation = async (ctx, next) => {
    let data = {
        user_id: Number(ctx.request.body.user_id)
    }
    let doc = await findUserById(data);
    result.USERINFO.FINDSUCCESS.data = doc;
    ctx.status = 200;
    ctx.body = result.USERINFO.FINDSUCCESS
}

// 修改用户信息
const modifyUserInformation = async (ctx, next) => {
    let data = {
        query: ctx.request.body.query,
        update: ctx.request.body.update
    }
    let doc = await upadateUser(data);
    result.USERINFO.UPDATESUCCESS.data = {
        token: doc.token,
        username: doc.username,
        userType: doc.userType,
        userImage: doc.userImage,
        user_id: doc.user_id,
        comments: doc.comments,
        create_time: doc.create_time
    }
    if (ctx.request.body.update.userImage) {
        let data = {
            query: {
                people_id: doc.user_id
            },
            update: {
                people_image: ctx.request.body.update.userImage
            }
        }
        await updateComments(data);
    }
    ctx.status = 200;
    ctx.body = result.USERINFO.UPDATESUCCESS;

}

const favoriteCourse = async (ctx, next) => {
    let data = {
        query: {
            user_id: ctx.request.body.user_id
        },
        options: {
            collections: { course_id: ctx.request.body.course_id, type: ctx.request.body.type }
        }
    };

    await insertUserComment(data);
    ctx.status = 200;
    ctx.body = result.USERINFO.UPDATESUCCESS;
}
const unfavoriteCourse = async (ctx, next) => {
    let data = {
        query: {
            user_id: ctx.request.body.user_id
        },
        options: {
            collections: { course_id: ctx.request.body.course_id, type: ctx.request.body.type }
        }
    };

    await removeUserComment(data);
    ctx.status = 200;
    ctx.body = result.USERINFO.UPDATESUCCESS;
}

module.exports = {
    Login,
    Register,
    getAllUser,
    insertUserComment,
    removeUserComment,
    getUserInformation,
    modifyUserInformation,
    favoriteCourse,
    unfavoriteCourse
}
