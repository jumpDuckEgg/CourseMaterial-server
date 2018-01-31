const userModel = require('../model/user.js');
// 转换时间格式
const moment = require('moment');
// 把objectId转换成时间
const timestamp = require('objectid-to-timestamp');
// 加密
const Hashes = require('jshashes');

//状态
const result =require('../result/index.js');

//生成token
const createToken = require('../token/createToken.js');

// 查找用户
const findUser = function(username){
    return new Promise((resolve,reject)=>{
        userModel.findOne({username},(err,doc)=>{
            if(err){
                reject(err);
            }
            resolve(doc);
        })
    })
}
const AddUser = function (data){
    return new Promise((resolve,reject)=>{
        data.save((err)=>{
            if(err){
                reject(err);
            }
            resolve();
        })
    })
}
//登陆接口

const Login = async (ctx,next)=>{
    let username = ctx.request.body.username;
    let password = new Hashes.SHA1().b64(ctx.request.body.password);
    let doc = await findUser(username);
    console.log(doc)
    if(!doc){
        console.log('检查到用户名不存在');
        ctx.status = 200;
        ctx.body = result.LOGIN.NOEXIST;
        
    }else if(doc.password === password){
        // 生成一个新的token
        let token = createToken(username);
        console.log(token);
        doc.token = token;
        await AddUser(doc);
        ctx.status = 200;
        result.LOGIN.SUCCESS.data={
            token:token,
            username:username
        }
        ctx.body = result.LOGIN.SUCCESS;
    }
}
const Register = async (ctx,next)=>{
    // let username = ctx.request.body.username;
    // let password = new Hashes.SHA1().b64(ctx.request.body.password);
    
    let user = new userModel({
        username: ctx.request.body.username,
        password: new Hashes.SHA1().b64(ctx.request.body.password), //加密
        token: createToken(this.username) //创建token并存入数据库
    });
    //将objectid转换为用户创建时间(可以不用)
    user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');

    let doc = await findUser(user.username);
    if(doc){
        console.log('检查到用户名已存在');
        ctx.status = 200;
        ctx.body = result.REGISTER.EXIST;      
    }else{
        await AddUser(user);
        console.log("注册用户成功");
        ctx.status = 200;
        ctx.body = result.REGISTER.SUCCESS;
    }
}

module.exports={
    Login,
    Register
}
