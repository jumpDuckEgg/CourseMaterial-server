const videoModel = require('../model/video.js');
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

module.exports={
    addVideos,
    findVideoById,
    removeVideo
}