const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moniTestSchema = new Schema({
    // 模拟试题Id
    moniTest_id:{
        type:Number,
        required:true
    },
    // 关联课程ID
    courseid:{
        type:Number,
        required:true
    },
    // 题目名称
    moniTest_title:{
        type:String,
        default:""
    },
    // 模拟试题答案
    moniTest_answer:{
        type:String
    },
    // 难度等级
    moniTest_level:{
        type:String,
        required:true
    },
    // 分数
    moniTest_score:{
        type:Number,
        default:0
    },
    // 答案解析
    moniTest_analysis:{
        type:String,
        default:""
    },
    // 选择题选项
    moniTest_optionsData:{
        type:Array,
        default:[]
    },
    // 模拟试题类型
    moniTest_type:{
        type:String,
        required:true
    }
});

const moniTestModel = mongoose.model('moniTest',moniTestSchema);

module.exports = moniTestModel;