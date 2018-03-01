const courseModel = require('../model/course.js');
const counterController = require('./counter.js');
const coursewareController = require('./courseware.js');
const videoController = require('./video.js');
const experimentController = require('./experiment.js');
const homeworkController = require('./homework.js');
const testController = require('./test.js');
const result = require('../result/index.js');
// 操作数据库
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
// 查找所有课程
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
// 查找一个课程
const findOneCourse = (data) => {
    return new Promise((resolve, reject) => {
        courseModel.findOne(data, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        })
    })
}
// 特殊获取全部课程
const findCourseLimit = (data) => {
    return new Promise((resolve, reject) => {
        courseModel.find(data.query).sort(data.sort).limit(data.limitNum).exec((err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res)
        })
    })
}




// 删除课程
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
// 更新一个课程
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
// 更新课程属性数组元素
const insertOneCourseArray = (data) => {
    return new Promise((resolve, reject) => {
        courseModel.update(data.query, { $push: data.options }, (err, raw) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}
// 移除课程数组元素
const removeOneCourseArray = (data) => {
    return new Promise((resolve, reject) => {
        courseModel.update(data.query, { $pull: data.options }, (err, raw) => {
            if (err) {
                reject(err)
            }
            resolve();
        })
    })
}
// 获取课程个数
const getCourseCount = (data) => {
    return new Promise((resolve, reject) => {
        courseModel.count(data, (err, count) => {
            if (err) {
                reject(err);
            }
            resolve(count);
        })
    })
}

// 方法
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

const getCourseByParams = async (ctx, next) => {
    let params = ctx.request.body.params;
    let options = ctx.request.body.options || {};
    let doc = await findAllCourse(params, options);
    result.COURSE.FINDALLSUCCESS.data = doc;
    ctx.status = 200;
    ctx.body = result.COURSE.FINDALLSUCCESS;
}

const getCourseLimit = async (ctx, next) => {
    let data = {
        query: {
            author: ctx.request.body.author
        },
        sort: {
            collectNum: -1
        },
        limitNum: 5
    }
    let doc = await findCourseLimit(data);
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

const findResourcesByCourseId = async (ctx, next) => {
    let query = ctx.request.body.query;
    let doc = await findAllCourse(query);
    let resourses = {};
    if (doc[0].Coursewares.length > 0) {
        await Promise.all(doc[0].Coursewares.map((value, index) => {
            return coursewareController.findCoursewareById({ 'courseware_id': value.courseware_id })
        })).then(result => {
            resourses['coursewares'] = result;
        })
    }
    if (doc[0].experiments.length > 0) {
        await Promise.all(doc[0].experiments.map((value, index) => {
            return experimentController.findExperimentById({ 'experiment_id': value.experiment_id })
        })).then(result => {
            resourses['experiments'] = result;
        })
    }
    if (doc[0].videos.length > 0) {
        await Promise.all(doc[0].videos.map((value, index) => {
            return videoController.findVideoById({ 'video_id': value.video_id })
        })).then(result => {
            resourses['videos'] = result;
        })
    }
    if (doc[0].homeWorks.length > 0) {
        await Promise.all(doc[0].homeWorks.map((value, index) => {
            return homeworkController.findHomeworkById({ 'homework_id': value.homework_id })
        })).then(result => {
            resourses['homeworks'] = result;
        })
    }
    if (doc[0].tests.length > 0) {
        await Promise.all(doc[0].tests.map((value, index) => {
            return testController.findTestById({ 'test_id': value.test_id })
        })).then(result => {
            resourses['tests'] = result;
        })
    }
    ctx.status = 200;
    result.MATERIAL.FINDSUCCESS.data = resourses;
    ctx.body = result.MATERIAL.FINDSUCCESS;
}

const removeResourcesByCourseId = async (ctx, next) => {
    console.log(ctx.request.body)
    if (ctx.request.body['courseware_id']) {
        console.log(ctx.request.body['courseware_id']);
        let data = {
            query: {
                course_id: ctx.request.body.course_id
            },
            options: {
                Coursewares: { 'courseware_id': ctx.request.body.courseware_id }
            }
        }

        await removeOneCourseArray(data);
        let coursewareData = {
            params: {
                courseware_id: ctx.request.body.courseware_id
            }
        }
        await coursewareController.removeCourseware(coursewareData);
    }
    if (ctx.request.body['experiment_id']) {
        console.log(ctx.request.body['experiment_id']);
        let data = {
            query: {
                course_id: ctx.request.body.course_id
            },
            options: {
                experiments: { 'experiment_id': ctx.request.body.experiment_id }
            }
        }

        await removeOneCourseArray(data);
        let experimentData = {
            params: {
                experiment_id: ctx.request.body.experiment_id
            }
        }
        await experimentController.removeExperiment(experimentData);
    }
    if (ctx.request.body['video_id']) {
        console.log(ctx.request.body['video_id']);
        let data = {
            query: {
                course_id: ctx.request.body.course_id
            },
            options: {
                videos: { 'video_id': ctx.request.body.video_id }
            }
        }

        await removeOneCourseArray(data);
        let videoData = {
            params: {
                video_id: ctx.request.body.video_id
            }
        }
        await videoController.removeVideo(videoData);
    }
    if (ctx.request.body['test_id']) {
        console.log(ctx.request.body['test_id']);
        let data = {
            query: {
                course_id: ctx.request.body.course_id
            },
            options: {
                tests: { 'test_id': ctx.request.body.test_id }
            }
        }

        await removeOneCourseArray(data);
        let testData = {
            params: {
                test_id: ctx.request.body.test_id
            }
        }
        await testController.removeTest(testData);
    }
    if (ctx.request.body['homework_id']) {
        console.log(ctx.request.body['homework_id']);
        let data = {
            query: {
                course_id: ctx.request.body.course_id
            },
            options: {
                homeWorks: { 'homework_id': ctx.request.body.homework_id }
            }
        }

        await removeOneCourseArray(data);
        let homeworkData = {
            params: {
                homework_id: ctx.request.body.homework_id
            }
        }
        await homeworkController.removeHomework(homeworkData);
    }
    ctx.status = 200;
    ctx.body = result.MATERIAL.REMOVESUCCESS;
}




module.exports = {
    findAllCourse,
    removeOneCourseArray,
    insertOneCourseArray,
    IncreaseCourse,
    getAllCourse,
    getCourseByParams,
    deleteCourse,
    examineOneCourse,
    updateCourse,
    getAllCourseByAuthor,
    updateOneCourse,
    addResources,
    findResourcesByCourseId,
    removeResourcesByCourseId,
    updateOneCourse,
    findOneCourse,
    getCourseCount,
    getCourseLimit
}