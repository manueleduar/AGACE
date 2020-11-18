const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MedioRecepcion = new Schema({
    nombre: String
}, {timestamps: true});


module.exports = MedioRecepcion;