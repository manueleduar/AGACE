const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Denuncia = new Schema({
    tema: {type: Schema.Types.ObjectId, ref: 'temas'},
    descripcion: String,
    fecha: Date,
    rfcs: [{id: String, 
            fecha: Date, 
            adminasig: String, 
            rfc: String, 
            tipo: String, 
            estatus:String, 
            procedio:Boolean,
            idprog: String,
            causarech: String,
            Observaciones: [String] }],
    origen: String,
    mediorecep: String,
    admlider: String,
});

let denuncias = mongoose.model('denuncias', Denuncia, 'denuncias');

let DenunciaLists ={
    get: ()=>{
        return denuncias.find().populate('tema') //Saca todos los denuncias
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
    /* deleteAll: () =>{
        return denuncias.deleteMany({})
        .then( reporte => {
            return reporte;
        })
        .catch( error => {
            throw Error( error );
        });
    } */
}

module.exports = {
    DenunciaLists
}