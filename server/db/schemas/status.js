const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Status = new Schema({
    nombre: String
}, {timestamps: true});

module.exports = Status;
