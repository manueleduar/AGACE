const mongoose = require('mongoose');
const CausaRechazo = require('../schemas/causaRechazo');
let causaRechazo = mongoose.model('causas_rechazo', CausaRechazo, 'causas_rechazo');

module.exports = causaRechazo;