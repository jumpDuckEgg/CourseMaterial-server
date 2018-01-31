const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
     username: String,
     password: String,
     token: {
         unique:true,
         type: String
     },
     create_time: Date
})
const UserModel = mongoose.model('user',UserSchema)

module.exports = UserModel;