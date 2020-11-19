const mongoose = require('mongoose');
const Administracion = require('./administacion');
const causaRechazo = require('./causaRechazo');
const Status = require('./status');

const Schema = mongoose.Schema;
const RFC = new Schema({
    id: String, 
    fecha: Date, 
    administracionAsignada: Administracion, 
    rfc: String, 
    tipo: String, 
    estatus:Status, 
    procedio:Boolean,
    idprog: String,
    causaRechazo: causaRechazo,
    observaciones: [String]
}, {timestamps: true});

module.exports = RFC;
