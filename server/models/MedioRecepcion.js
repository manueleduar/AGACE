const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MedioRecepcion = new Schema({
    nombre: String
});

let medioRecepcion = mongoose.model('medios_recepcion', MedioRecepcion, 'medios_recepcion');

let MedioRecepcionUtil ={
    get: ()=>{
        return medioRecepcion.find() //Saca todos los admin
            .then( mediosRecepcion => {
                return mediosRecepcion;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    post: (newMedioRecepcion) => {               //CREATE admin
        return medioRecepcion.create(newMedioRecepcion)
            .then( medioRecepcion => {
                return medioRecepcion;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    getbyId:(id) =>{
        return medioRecepcion.findById(id) //Saca todos los admin
            .then( medioRecepcion => {
                return medioRecepcion;
            })
            .catch( error => {
                throw Error( error );
            });
    },

    /* deleteAll: () =>{
        return temas.deleteMany({})
        .then( reporte => {
            return reporte;
        })
        .catch( error => {
            throw Error( error );
        });
    } */

}

module.exports = MedioRecepcionUtil