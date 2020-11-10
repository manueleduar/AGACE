const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Administracion = new Schema({
    nombre: String
});

module.exports = Administracion;