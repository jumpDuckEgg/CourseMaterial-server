const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    // 课程Id
    course_id:{
        type:Number
    },
    // 课程申报书
    course_declaration:{
        type:String
    },
    // 课程名称
    course_name:{
        type:String,
        required:true
    },
    // 课程缩略图
    courseImage:{
        type:String
    },
    // 课程描述
    description:{
        type:String,
        default:'暂无描述'
    },
    // 课程作者
    author:{
        type:String
    },
    // 星数
    star:{
        type:Number,
        default:0
    },
    // 是否发布
    isPublish:{
        type:String,
        default:'examine'//初始状态为：examine:审核中；pass:审核通过；fail：审核失败
    },
    // 审核信息
    examineMessage:{
        type:String
    },
    // 创建时间
    createdTime:{
        type:Date,
        default:new Date()
    },
    //  课件资源
    Coursewares:{
        type:Array,
        default:[]
    },
    // 实验资源
    experiments:{
        type:Array,
        default:[]
    },
    // 在线测试
    onlineTests:{
        type:Array,
        default:[]
    },
    // 视频资源
    videos:{
        type:Array,
        default:[]
    },
    // 习题和作业
    homeWorks:{
        type:Array,
        default:[]
    },
    // 模拟试题
    tests:{
        type:Array,
        default:[]
    },
    // 评价
    evaluation:{
        type:Array,
        default:[]
    }
});

const courseModel = mongoose.model('course',courseSchema);

module.exports = courseModel;