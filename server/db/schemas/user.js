const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
const User = new Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    profile: String
}, {timestamps: true});

User.plugin(passportLocalMongoose, {
    selectFields: "username email firstName lastName"
});

module.exports = User;