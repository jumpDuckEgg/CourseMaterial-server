const jwt = require('jsonwebtoken');
const config = require('../config/index.js');
module.exports = function (user_id) {
    const token = jwt.sign({
        user_id: user_id
    },
        config.TOKEN, {
            expiresIn: '5h'
        }
    );
    return token;
}