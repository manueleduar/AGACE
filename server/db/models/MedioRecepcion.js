const mongoose = require('mongoose');
const MedioRecepcion = require('../schemas/medioRecepcion');

let medioRecepcion = mongoose.model('medios_recepcion', MedioRecepcion, 'medios_recepcion');

module.exports = medioRecepcion