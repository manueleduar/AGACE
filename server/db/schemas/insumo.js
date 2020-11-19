const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Insumo = new Schema({
    nombre: String
}, {timestamps: true});

module.exports = Insumo;
