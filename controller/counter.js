const counterModel = require('../model/counter.js');

const init = async () => {
    await counterModel.findOne({ couterType: 'course' }, (err, res) => {
        if (!res) {
            let courseEntity = new counterModel({
                couterType: 'course',
                couterNum: 0
            });
            courseEntity.save((res) => {
                console.log("课程计数器初始化成功")
            })
        }
    })
    await counterModel.findOne({ couterType: 'courseware' }, (err, res) => {
        if (!res) {
            let courseEntity = new counterModel({
                couterType: 'courseware',
                couterNum: 0
            });
            courseEntity.save((res) => {
                console.log("课件计数器初始化成功")
            })
        }
    })
}

const getNextCounterNum = (counterType) => {
    let query = { 'couterType': counterType };
    let update = { $inc: { couterNum: 1 } };
    let options = { new: true };
    return new Promise((resolve, reject) => {
        counterModel.findOneAndUpdate(query, update, options, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve(doc);
        });
    })
}

module.exports = {
    init,
    getNextCounterNum
}