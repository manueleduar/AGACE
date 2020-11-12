const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Insumo = new Schema({
    nombre: String
});

module.exports = Insumo;
