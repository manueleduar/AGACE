const mongoose = require('mongoose');
const Tema = require('../schemas/tema');

let temas = mongoose.model('temas', Tema, 'temas');

module.exports = temas;