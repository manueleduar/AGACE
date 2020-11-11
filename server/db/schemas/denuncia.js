const mongoose = require('mongoose');
const Administracion = require('./administacion');
const Insumo = require('./insumo');
const MedioRecepcion = require('./medioRecepcion');
const RFC = require('./rfc');
const Tema = require('./tema');

const Schema = mongoose.Schema;
const Denuncia = new Schema({
    tema: Tema,
    descripcion: String,
    fecha: Date,
    rfcs: [RFC],
    origen: Insumo,
    medioRecepcion: MedioRecepcion,
    adminstracionLider: Administracion,
    documentos: [String]
});

module.exports = Denuncia;