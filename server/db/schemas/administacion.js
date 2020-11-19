const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Administracion = new Schema({
    nombre: String
}, {timestamps: true});

module.exports = Administracion;