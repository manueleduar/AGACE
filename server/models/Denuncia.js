const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Denuncia = new Schema({
    tema: String,
    descripcion: String,
    admasignada: String,
    rfc: [String],
    avance: Number,
    admlider: String,
    rfctotales: [String],
    avanceaccpce : Number
});

let denuncias = mongoose.model('denuncias', Denuncia, 'denuncias');

let DenunciaLists ={
    get: ()=>{
        return denuncias.find() //Saca todos los denuncias
            .then( denuncias => {
                return denuncias;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    post: (newReporte) => {               //CREATE Reporte
        return denuncias.create(newReporte)
            .then( reporte => {
                return reporte;
            })
            .catch( error => {
                throw Error( error );
            });
    },
}

module.exports = {
    DenunciaLists
}