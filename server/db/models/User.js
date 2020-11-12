const mongoose = require('mongoose');
const User = require('../schemas/user');

module.exports = Users = mongoose.model('users', User, 'users');