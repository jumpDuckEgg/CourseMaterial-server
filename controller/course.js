const courseModel = require('../model/course.js');
const counterController = require('./counter.js');
const coursewareController = require('./courseware.js');
const videoController = require('./video.js');
const experimentController = require('./experiment.js');
const homeworkController = require('./homework.js');
const testController = require('./test.js');
const result = require('../result/index.js');
const AddCourse = (data) => {
    return new Promise((resolve, reject) => {
        data.save((err) => {
            if (err) {
                reject(err)
            }
            resolve();
        })
    })
}

const findAllCourse = (query, options) => {
    return new Promise((resolve, reject) => {
        courseModel.find(query || {}, options || {}, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        })
    })
}

const removeCourse = (data) => {
    return new Promise((resolve, reject) => {
        courseModel.findOneAndRemove(data, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    })
}

const updateOneCourse = (data) => {
    return new Promise((resolve, reject) => {
        courseModel.findOneAndUpdate(data.query, data.options, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}
const insertOneCourseArray = (data) => {
    return new Promise((resolve, reject) => {
        courseModel.updateMany(data.query, { $push: data.options }, (err, doc) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}

const IncreaseCourse = async (ctx, next) => {
    let id = 0;
    await counterController.getNextCounterNum('course').then(res => {
        id = res.couterNum
    });
    let course = new courseModel({
        course_id: id,
        course_name: ctx.request.body.name,
        description: ctx.request.body.description,
        courseImage: ctx.request.body.imageUrl,
        course_declaration: ctx.request.body.docUrl,
        star: ctx.request.body.starNum,
        author: ctx.request.body.author
    });
    await AddCourse(course);
    ctx.status = 200;
    ctx.body = result.COURSE.CREATESUCCESS;
}

const getAllCourse = async (ctx, next) => {
    let doc = await findAllCourse();
    ctx.status = 200;
    result.COURSE.FINDALLSUCCESS.data = doc;
    ctx.body = result.COURSE.FINDALLSUCCESS;
}

const deleteCourse = async (ctx, next) => {
    let data = { course_id: ctx.request.body.course_id };
    let doc = await removeCourse(data);
    result.COURSE.REMOVESUCCESS.data = doc;
    ctx.body = result.COURSE.REMOVESUCCESS;
}

const examineOneCourse = async (ctx, next) => {
    let data = {
        query: ctx.request.body.query,
        options: ctx.request.body.options
    }
    await updateOneCourse(data);
    ctx.status = 200;
    ctx.body = result.COURSE.PASSCOURSE;
}

const updateCourse = async (ctx, next) => {
    let data = {
        query: ctx.request.body.query,
        options: ctx.request.body.options
    }
    await updateOneCourse(data);
    ctx.status = 200;
    ctx.body = result.COURSE.UPDATESUCCESS;
}

const getAllCourseByAuthor = async (ctx, next) => {
    let params = ctx.request.body.params;
    let options = ctx.request.body.options || {};
    let doc = await findAllCourse(params, options);
    result.COURSE.FINDALLSUCCESS.data = doc;
    ctx.status = 200;
    ctx.body = result.COURSE.FINDALLSUCCESS;
}

const addResources = async (ctx, next) => {
    // 课件资源
    if (ctx.request.body.coursewares) {
        let coursewareData = ctx.request.body.coursewares;
        await Promise.all(coursewareData.map(function (elem) {
            return counterController.getNextCounterNum('courseware')
        })).then(function (result) {
            coursewareData.map((value, index) => {
                value.courseware_id = result[index].couterNum;
            });
        }).catch(err => {
            console.log(err)
        });
        let doc = await coursewareController.addCoursewares(coursewareData);
        await Promise.all(doc.map((value, index) => {
            let courseUpdate = {
                query: {
                    course_id: value.course_id
                },
                options: {
                    Coursewares: { 'courseware_id': value.courseware_id }
                }
            };
            return insertOneCourseArray(courseUpdate);
        })).then(() => {
        })
    };

    // 视频资源
    if (ctx.request.body.videos) {
        let videoData = ctx.request.body.videos;
        await Promise.all(videoData.map(function (elem) {
            return counterController.getNextCounterNum('video')
        })).then(function (result) {
            videoData.map((value, index) => {
                value.video_id = result[index].couterNum;
            });
        }).catch(err => {
            console.log(err)
        });
        let doc = await videoController.addVideos(videoData);
        console.log(doc)
        await Promise.all(doc.map((value, index) => {
            let videoUpdate = {
                query: {
                    course_id: value.course_id
                },
                options: {
                    videos: { 'video_id': value.video_id }
                }
            };
            return insertOneCourseArray(videoUpdate);
        })).then(() => {
        })
    };
    // 实验资源
    if (ctx.request.body.experiments) {
        let experimentData = ctx.request.body.experiments;
        await Promise.all(experimentData.map(function (elem) {
            return counterController.getNextCounterNum('experiment')
        })).then(function (result) {
            experimentData.map((value, index) => {
                value.experiment_id = result[index].couterNum;
            });
        }).catch(err => {
            console.log(err)
        });
        let doc = await experimentController.addExperiments(experimentData);
        console.log(doc)
        await Promise.all(doc.map((value, index) => {
            let experimentUpdate = {
                query: {
                    course_id: value.course_id
                },
                options: {
                    experiments: { 'experiment_id': value.experiment_id }
                }
            };
            return insertOneCourseArray(experimentUpdate);
        })).then(() => {
        })
    };
    // 习题作业
    if (ctx.request.body.homeworks) {
        let homeworkData = ctx.request.body.homeworks;
        await Promise.all(homeworkData.map(function (elem) {
            return counterController.getNextCounterNum('homework')
        })).then(function (result) {
            homeworkData.map((value, index) => {
                value.homework_id = result[index].couterNum;
            });
        }).catch(err => {
            console.log(err)
        });
        let doc = await homeworkController.addHomeworks(homeworkData);
        console.log(doc)
        await Promise.all(doc.map((value, index) => {
            let homeworkUpdate = {
                query: {
                    course_id: value.course_id
                },
                options: {
                    homeWorks: { 'homework_id': value.homework_id }
                }
            };
            return insertOneCourseArray(homeworkUpdate);
        })).then(() => {
        })
    };

    // 模拟试题
    if (ctx.request.body.tests) {
        let testData = ctx.request.body.tests;
        await Promise.all(testData.map(function (elem) {
            return counterController.getNextCounterNum('test')
        })).then(function (result) {
            testData.map((value, index) => {
                value.test_id = result[index].couterNum;
            });
        }).catch(err => {
            console.log(err)
        });
        let doc = await testController.addTests(testData);
        console.log(doc)
        await Promise.all(doc.map((value, index) => {
            let testUpdate = {
                query: {
                    course_id: value.course_id
                },
                options: {
                    tests: { 'test_id': value.test_id }
                }
            };
            return insertOneCourseArray(testUpdate);
        })).then(() => {
        })
    };

    ctx.status = 200;
    ctx.body = result.MATERIAL.CREATESUCCESS;
}

module.exports = {
    IncreaseCourse,
    getAllCourse,
    deleteCourse,
    examineOneCourse,
    updateCourse,
    getAllCourseByAuthor,
    updateOneCourse,
    addResources
}