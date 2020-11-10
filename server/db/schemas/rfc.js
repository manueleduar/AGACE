const mongoose = require('mongoose');
const Administracion = require('./administacion');

const Schema = mongoose.Schema;
const RFC = new Schema({
    id: String, 
    fecha: Date, 
    administracionAsignada: Administracion, 
    rfc: String, 
    tipo: String, 
    estatus:String, 
    procedio:Boolean,
    idprog: String,
    causaRechazo: String,
    observaciones: [String]
});

module.exports = RFC;
