const LOGIN = {
    SUCCESS: { code: 1, message: '登陆成功', data: null },
    FAIL: { code: 2, message: '密码错误', data: null },
    NOEXIST: { code: 3, message: '用户不存在', data: null }
}
const REGISTER = {
    SUCCESS: { code: 4, message: '注册成功', data: null },
    EXIST: { code: 5, message: '用户已存在', data: null },
}
const USERINFO = {
    FINDALL: { code: 6, message: '获取全部用户信息成功', data: null }
}
const COURSE = {
    CREATESUCCESS: { code: 7, message: "创建课程成功", data: null },
    FINDALLSUCCESS: { code: 8, message: '获取全部课程信息成功', data: null },
    REMOVESUCCESS: { code: 9, message: '删除课程成功', data: null },
    PASSCOURSE: { code: 10, message: '审核成功', data: null },
    UPDATESUCCESS: { code: 11, message: "更新课程成功", data: null },
}

const MATERIAL = {
    CREATESUCCESS: { code: 12, message: "创建课件成功", data: null },
    FINDSUCCESS: { code: 13, message: "查找资源成功", data: null },
    REMOVESUCCESS: { code: 14, message: '删除资源成功', data: null }
}

const ONLINETEST = {
    CREATESUCCESS: { code: 15, message: '创建在线测试成功', data: null },
    FINDSUCCESS: { code: 16, message: "查找在线测试成功", data: null },
    MODIFYSUCCESS: { code: 17, message: '修改在线测试成功', data: null },
    REMOVESUCCESS: { code: 18, message: "删除在线测试成功", data: null }
}

const VIDEO = {
    FINDSUCCESS: { code: 19, message: "查找视频成功", data: null }
}

const COMMENT = {
    CREATESUCCESS: { code: 20, message: '添加评论成功', data: null },
    FINDALLSUCCESS: { code: 21, message: '查找评论成功', data: null },
    MODIFYSUCCESS: { code: 22, message: "修改评论成功", data: null }
}

module.exports = {
    LOGIN,
    REGISTER,
    USERINFO,
    COURSE,
    MATERIAL,
    ONLINETEST,
    VIDEO,
    COMMENT
}