const commentModel = require('../model/comment.js');
const counterController = require('./counter.js');
const userController = require('./user.js');
const result = require('../result/index.js');

const addComment = (data) => {
    return new Promise((resolve, reject) => {
        data.save(err => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

const findAllComment = (data) => {
    return new Promise((resolve, reject) => {
        commentModel.find(data.query, data.options || null, data.sort || null, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc)
        })
    })
}

// 特殊查找评论集
const findCommentLimit = (data) => {
    return new Promise((resolve, reject) => {
        commentModel.find(data.query).sort(data.sort).limit(data.limitnNum).exec((err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res);
        })
    })
}

const getCommentCount = (data) => {
    return new Promise((resolve, reject) => {
        commentModel.count(data, (err, count) => {
            if (err) {
                reject(err);
            }
            resolve(count)
        })
    })
}


// 分页评价

const findCommentSpecial = (data) => {
    return new Promise((resolve, reject) => {
        commentModel.find(data.query, null, { skip: data.skip, limit: data.limit, sort: { createdTime: 1 } }, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}

const updateComment = (data) => {
    return new Promise((resolve, reject) => {
        commentModel.updateOne(data.query, data.options, (err, raw) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

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

const removeComment = (data) => {
    return new Promise((resolve, reject) => {
        commentModel.remove(data, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}


const increaseComment = async (ctx, next) => {
    let id = 0;
    await counterController.getNextCounterNum('comment').then(res => {
        id = res.couterNum
    });

    let comment = new commentModel({
        comment_id: id,
        comment_content: ctx.request.body.comment_content,
        comment_type: ctx.request.body.comment_type,
        type_id: ctx.request.body.type_id,
        comment_people: ctx.request.body.comment_people,
        people_image: ctx.request.body.people_image,
        people_id: Number(ctx.request.body.user_id)
    });

    await addComment(comment);


    let data = {
        query: {
            user_id: Number(ctx.request.body.user_id)
        },
        options: {
            comments: { comment_id: id }
        }
    }

    await userController.insertUserComment(data);
    ctx.status = 200;
    ctx.body = result.COMMENT.CREATESUCCESS;

}

const getCommentByType = async (ctx, next) => {
    let data = {
        query: {
            comment_type: ctx.request.body.comment_type,
            type_id: ctx.request.body.type_id,

        }
    }
    if (ctx.request.body.isPublish) {
        data.query.isPublish = ctx.request.body.isPublish
    }
    let doc = await findAllComment(data);
    result.COMMENT.FINDALLSUCCESS.data = doc;
    ctx.status = 200;
    ctx.body = result.COMMENT.FINDALLSUCCESS;
}

const getAllComment = async (ctx, next) => {
    let data = {
        query: {},
        sort: ctx.request.body.sort || null
    };
    let docs = await findAllComment(data);
    result.COMMENT.FINDALLSUCCESS.data = docs;
    ctx.status = 200;
    ctx.body = result.COMMENT.FINDALLSUCCESS;
}

const getAllCommentById = async (ctx, next) => {
    let data = {
        query: {
            comment_people: ctx.request.body.comment_people,
            people_id: ctx.request.body.people_id
        }
    };
    let docs = await findAllComment(data);
    result.COMMENT.FINDALLSUCCESS.data = docs;
    ctx.status = 200;
    ctx.body = result.COMMENT.FINDALLSUCCESS;
}

const modifyCommentPublish = async (ctx, next) => {
    let data = {
        query: {
            comment_id: ctx.request.body.comment_id
        },
        options: {
            isPublish: ctx.request.body.isPublish
        }
    }
    await updateComment(data);
    ctx.status = 200;
    ctx.body = result.COMMENT.MODIFYSUCCESS;
}


const deleteComment = async (ctx, next) => {
    let data = {
        comment_id: ctx.request.body.comment_id
    }
    await removeComment(data);
    let updateData = {
        query: {
            user_id: Number(ctx.request.body.user_id)
        },
        options: {
            comments: { comment_id: ctx.request.body.comment_id }
        }
    }

    await userController.removeUserComment(updateData);
    ctx.status = 200;
    ctx.body = result.COMMENT.DELETESUCCESS;
}

// 特殊返回评论集

const getCommentLimit = async (ctx, next) => {
    let data = {
        query: {
            comment_people: ctx.request.body.comment_people,
            people_id: ctx.request.body.people_id
        },
        sort: {
            createdTime: -1
        },
        limitnNum: 5
    };
    let docs = await findCommentLimit(data);
    result.COMMENT.FINDALLSUCCESS.data = docs;
    ctx.status = 200;
    ctx.body = result.COMMENT.FINDALLSUCCESS;
}

// 特殊返回评论集(管理员)

const getCommentLimitByAdmin = async (ctx, next) => {
    let data = {
        query: {},
        sort: {
            createdTime: -1
        },
        limitnNum: 5
    };
    let docs = await findCommentLimit(data);
    result.COMMENT.FINDALLSUCCESS.data = docs;
    ctx.status = 200;
    ctx.body = result.COMMENT.FINDALLSUCCESS;
}

// 分页评价

const getCommentSpecial = async (ctx, next) => {

    let data = {
        query: ctx.request.body.query,
        skip: (ctx.request.body.page - 1) * ctx.request.body.limit,
        limit: ctx.request.body.limit
    }
    let doc = await findCommentSpecial(data);
    let countData = ctx.request.body.query;
    let allCount = await getCommentCount(countData);

    let commentsResult = {
        comments: doc,
        countNum: allCount
    }
    result.COMMENT.FINDALLSUCCESS.data = commentsResult;
    ctx.status = 200;
    ctx.body = result.COMMENT.FINDALLSUCCESS;
}

module.exports = {
    increaseComment,
    getCommentByType,
    getAllComment,
    getAllCommentById,
    modifyCommentPublish,
    deleteComment,
    updateComments,
    getCommentLimit,
    getCommentSpecial,
    getCommentLimitByAdmin
}