const mongoose = require('mongoose');
const Insumo = require('../schemas/insumo');
let insumo = mongoose.model('insumos', Insumo, 'insumos');

module.exports = insumo;