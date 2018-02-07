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
    FINDALLSUCCESS: { code: 8, message: '获取全部用户信息成功', data: null },
    REMOVESUCCESS: { code: 9, message: '删除课程成功', data: null }
}

module.exports = {
    LOGIN,
    REGISTER,
    USERINFO,
    COURSE
}