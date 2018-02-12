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

module.exports={
    addVideos
}