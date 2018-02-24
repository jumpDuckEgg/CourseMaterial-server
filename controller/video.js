const videoModel = require('../model/video.js');
const result = require('../result/index.js');


const addVideos = (data) => {
    return new Promise((resolve, reject) => {
        videoModel.insertMany(data, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc)
        })
    })
}

const findVideoById = (data ) =>{
    return new Promise((resolve,reject)=>{
        videoModel.findOne(data,(err,doc)=>{
            if(err){
                reject(err)
            }
            resolve(doc)
        })
    })
}

const removeVideo = (data) => {
    return new Promise((resolve,reject)=>{
        videoModel.remove(data.params,(err)=>{
            if(err){
                reject(err);
            }
            resolve();
        })
    })
}


const getVideoById = async (ctx,next)=>{
    let data = {
        video_id:ctx.request.body.video_id
    }
    let doc = await findVideoById(data);
    ctx.status = 200;
    result.VIDEO.FINDSUCCESS.data = doc;
    ctx.body = result.VIDEO.FINDSUCCESS;
}

module.exports={
    addVideos,
    findVideoById,
    removeVideo,
    getVideoById
}