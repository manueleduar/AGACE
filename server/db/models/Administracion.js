const mongoose = require('mongoose');
const Administracion = require('../schemas/administacion');

let administracion = mongoose.model('administraciones', Administracion, 'administaciones');

module.exports = administracion;