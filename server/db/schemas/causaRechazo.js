const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const causaRechazo = new Schema({
    nombre: String
}, {timestamps: true});

module.exports = causaRechazo;
