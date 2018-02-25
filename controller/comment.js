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
        people_image: ctx.request.body.people_image
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




module.exports = {
    increaseComment,
    getCommentByType
}