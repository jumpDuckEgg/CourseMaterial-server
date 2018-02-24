const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    // 评论ID
    comment_id:{
        type:Number
    },
    // 评论内容
    comment_content:{
        type:String,
        required:true
    },
    // 评论所属类型
    comment_type:{
        type:String,
        required:true
    },
    // 评论所属类型Id
    type_id:{
        type:Number,
        required:true
    },
    // 评论人
    comment_people:{
        type:String,
        required:true
    },
     // 创建时间
     createdTime:{
        type:Date,
        default:new Date()
    },
})

const commentModel = mongoose.model('comment',commentSchema);

module.exports = commentModel;