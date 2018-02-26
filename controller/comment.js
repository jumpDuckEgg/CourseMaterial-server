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
        commentModel.find(data.query, (err, doc) => {
            if (err) {
                reject(err);
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

const updateComments = (data)=>{
    return new Promise((resolve,reject)=>{
        commentModel.updateMany(data.query,data.update,(err,raw)=>{
            if(err){
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
        people_id:Number(ctx.request.body.user_id)
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
            type_id: ctx.request.body.type_id
        }
    }
    let doc = await findAllComment(data);
    result.COMMENT.FINDALLSUCCESS.data = doc;
    ctx.status = 200;
    ctx.body = result.COMMENT.FINDALLSUCCESS;
}

const getAllComment = async (ctx, next) => {
    let data = {
        query: {}
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

module.exports = {
    increaseComment,
    getCommentByType,
    getAllComment,
    modifyCommentPublish,
    deleteComment,
    updateComments
}