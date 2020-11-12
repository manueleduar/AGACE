const mongoose = require('mongoose');
const Denuncia = require('../schemas/denuncia');

let denuncias = mongoose.model('denuncias', Denuncia, 'denuncias');

module.exports = denuncias;