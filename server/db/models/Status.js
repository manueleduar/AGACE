const mongoose = require('mongoose');
const Status = require('../schemas/status');
let status = mongoose.model('status', Status, 'status');

module.exports = status;