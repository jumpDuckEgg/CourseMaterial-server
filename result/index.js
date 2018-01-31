const LOGIN = {
    SUCCESS: { code: 1, message: '登陆成功', data: null },
    FAIL: { code: 2, message: '登陆验证失败', data: null },
    NOEXIST:{code: 3,message:'用户不存在',data:null}
}
const REGISTER = {
    SUCCESS : {code:4,message:'注册成功',data:null},
    EXIST: { code: 5, message: '用户已存在', data: null },
}

module.exports = {
    LOGIN,
    REGISTER
}