const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Tema = new Schema({
    nombre: String
});

module.exports = Tema;