const userModel = require('../model/user.js');
const counterController = require('./counter.js');
const commentModel = require('../model/comment.js');
const courseController = require('./course.js');
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

const getCommentCount = (data) => {
    return new Promise((resolve, reject) => {
        commentModel.count(data, (err, count) => {
            if (err) {
                reject(err)
            }
            resolve(count)
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

// 删除用户
const removeUser = (data) => {
    return new Promise((resolve, reject) => {
        userModel.remove(data, err => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}




const findUserByOptions = function (data) {
    return new Promise((resolve, reject) => {
        userModel.findOne(data.query, data.options, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc)
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

// 获取全部用户数量
const getUserNum = (data) => {
    return new Promise((resolve, reject) => {
        userModel.count(data, (err, count) => {
            if (err) {
                reject(err);
            }
            resolve(count);
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
        if (doc.disUsed) {
            result.USERINFO.DISUSED.data = {
                disUsedMessage: doc.disUsedMessage
            }
            ctx.status = 200;
            ctx.body = result.USERINFO.DISUSED;
        } else {
            ctx.status = 200;
            result.LOGIN.SUCCESS.data = {
                token: token,
                username: username,
                userType: doc.userType,
                userImage: doc.userImage,
                user_id: doc.user_id
            }
            ctx.body = result.LOGIN.SUCCESS;
        }

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
    let userData = ctx.request.body.query;

    let doc = await findUserById(userData);
    if (doc.userType == 3) {
        ctx.status = 200;
        result.USERINFO.DELETEFAIL.message = "没有权限修改"
        ctx.body = result.USERINFO.DELETEFAIL;
    } else {
        let data = {
            query: ctx.request.body.query,
            update: ctx.request.body.update
        }
        let doc = await upadateUser(data);
        ctx.status = 200;
        ctx.body = result.USERINFO.UPDATESUCCESS;
    }


}
// 收藏课程
const favoriteCourse = async (ctx, next) => {
    let data = {
        query: {
            user_id: ctx.request.body.user_id
        },
        options: {
            collections: { course_id: ctx.request.body.course_id, course_name: ctx.request.body.course_name, courseImage: ctx.request.body.courseImage }
        }
    };
    let findData = {
        query: {
            collections: { $elemMatch: { course_id: ctx.request.body.course_id, course_name: ctx.request.body.course_name, courseImage: ctx.request.body.courseImage } }
        }
    }
    let doc = await findUserByOptions(findData);

    if (doc) {
        ctx.status = 200;
        ctx.body = result.USERINFO.COLLECTEXIST;
    } else {
        await insertUserComment(data);
        let num = ctx.request.body.collectNum;
        num++;
        let courseUpdate = {
            query: { course_id: ctx.request.body.course_id },
            options: { collectNum: num }
        }
        await courseController.updateOneCourse(courseUpdate);
        ctx.status = 200;
        ctx.body = result.USERINFO.UPDATESUCCESS;
    }

}

// 取消收藏
const unfavoriteCourse = async (ctx, next) => {
    let data = {
        query: {
            user_id: ctx.request.body.user_id
        },
        options: {
            collections: { course_id: ctx.request.body.course_id, course_name: ctx.request.body.course_name, courseImage: ctx.request.body.courseImage }
        }
    };
    let courseData = {
        course_id: ctx.request.body.course_id
    }
    let doc = await courseController.findOneCourse(courseData);
    let num = doc.collectNum;
    num--;
    let courseUpdate = {
        query: { course_id: ctx.request.body.course_id },
        options: { collectNum: num }
    }
    await courseController.updateOneCourse(courseUpdate);
    await removeUserComment(data);
    ctx.status = 200;
    ctx.body = result.USERINFO.UPDATESUCCESS;
}


// 获取用户数据
const getUserCountNum = async (ctx, next) => {
    let data = {
        author: ctx.request.body.username
    }

    let courseNum = 0;
    courseNum = await courseController.getCourseCount(data);
    let docs = await courseController.findAllCourse(data);
    let materialNum = 0;
    let onlineTestNum = 0;
    let commentNum = 0;
    if (docs.length != 0) {
        for (let i = 0; i < docs.length; i++) {
            materialNum += docs[i].Coursewares.length + docs[i].experiments.length + docs[i].videos.length + docs[i].videos.length + docs[i].homeWorks.length + docs[i].tests.length;
            onlineTestNum += docs[i].onlineTests.length;
            let courseCommnetData = {
                comment_type: "course",
                type_id: docs[i].course_id
            }
            let courseCommentNum = await getCommentCount(courseCommnetData);
            commentNum += Number(courseCommentNum);
            if (docs[i].experiments.length != 0) {
                await Promise.all(docs[i].experiments.map(function (elem) {
                    let commentData = {
                        comment_type: "experiment",
                        type_id: elem.experiment_id
                    }
                    return getCommentCount(commentData)
                })).then(function (result) {
                    result.map((value, index) => {
                        commentNum += Number(value)
                    });
                }).catch(err => {
                    console.log(err)
                });

            }
            if (docs[i].videos.length != 0) {
                await Promise.all(docs[i].videos.map(function (elem) {

                    let commentData = {
                        comment_type: "videos",
                        type_id: elem.video_id
                    }
                    return getCommentCount(commentData)
                })).then(function (result) {
                    result.map((value, index) => {
                        commentNum += Number(value)
                    });
                }).catch(err => {
                    console.log(err)
                });
            }
            if (docs[i].homeWorks.length != 0) {
                await Promise.all(docs[i].homeWorks.map(function (elem) {

                    let commentData = {
                        comment_type: "homework",
                        type_id: elem.homework_id
                    }
                    return getCommentCount(commentData)
                })).then(function (result) {
                    result.map((value, index) => {
                        commentNum += Number(value)
                    });
                }).catch(err => {
                    console.log(err)
                });
            }
            if (docs[i].tests.length != 0) {
                await Promise.all(docs[i].tests.map(function (elem) {

                    let commentData = {
                        comment_type: "test",
                        type_id: elem.test_id
                    }
                    return getCommentCount(commentData)
                })).then(function (result) {
                    result.map((value, index) => {
                        commentNum += Number(value)
                    });
                }).catch(err => {
                    console.log(err)
                });
            }
        }
    }

    ctx.status = 200;

    result.USERINFO.FINDCOUNTSUCCESS.data = {
        courseNum: courseNum,
        materialNum: materialNum,
        onlineTestNum: onlineTestNum,
        commentNum: commentNum
    }
    ctx.body = result.USERINFO.FINDCOUNTSUCCESS;
}


// 删除用户

const deleteUser = async (ctx, next) => {
    let data = {
        user_id: ctx.request.body.user_id,
        username: ctx.request.body.username
    }
    let doc = await findUserById(data);
    if (doc.userType == 3) {
        ctx.status = 200;
        ctx.body = result.USERINFO.DELETEFAIL;
    } else {
        await removeUser(data);
        ctx.status = 200;
        ctx.body = result.USERINFO.DELETESUCCESS;
    }

}

// 修改密码
const modifyUserPassword = async (ctx, next) => {

    let userData = {
        user_id: ctx.request.body.user_id,
    }
    let doc = await findUserById(userData);
    console.log(doc)
    if (doc.userType == 3) {
        ctx.status = 200;
        result.USERINFO.DELETEFAIL.message = "没有权限修改"
        ctx.body = result.USERINFO.DELETEFAIL;
    } else {
        let data = {
            query: {
                user_id: ctx.request.body.user_id,
            },
            update: {
                password: new Hashes.SHA1().b64(ctx.request.body.password), //加密
            }
        }
        let doc = await upadateUser(data);
        ctx.status = 200;
        ctx.body = result.USERINFO.UPDATESUCCESS;
    }
}


const getUserNumData = async (ctx, next) => {
    let teacherNumData = {
        userType: 1
    }
    let teacherCount = await getUserNum(teacherNumData);
    let studentNumData = {
        userType: 0
    }
    let studentCount = await getUserNum(studentNumData);
    let courseCommentNum = await getCommentCount({});
    let courseNumData = {
        isPublish: 'examine'
    }
    let courseNum = await courseController.getCourseCount(courseNumData);

    ctx.status = 200;

    result.USERINFO.FINDCOUNTSUCCESS.data = {
        teacherCount: teacherCount,
        studentCount: studentCount,
        courseNum: courseNum,
        courseCommentNum: courseCommentNum
    }
    ctx.body = result.USERINFO.FINDCOUNTSUCCESS;
}



module.exports = {
    Login,
    Register,
    getAllUser,
    findUserById,
    insertUserComment,
    removeUserComment,
    getUserInformation,
    modifyUserInformation,
    favoriteCourse,
    unfavoriteCourse,
    getUserCountNum,
    deleteUser,
    modifyUserPassword,
    getUserNumData
}
