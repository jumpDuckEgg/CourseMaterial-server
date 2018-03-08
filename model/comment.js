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
    // 评论上下线
    isPublish:{
        type:Boolean,
        default:true
    },
    // 评论人
    comment_people:{
        type:String,
        required:true
    },
    // 评论人ID
    people_id:{
        type:Number,
    },
    // 评论人图片
    people_image:{
        type:String,
        required:true
    },
     // 创建时间
     createdTime:{
        type:Number,
        default:new Date().getTime()
    },
})

const commentModel = mongoose.model('comment',commentSchema);

module.exports = commentModel;