const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const counterSchema = new Schema({
    couterType:String,
    couterNum:Number
});

const counterModel = mongoose.model('counter',counterSchema);

module.exports = counterModel;