const medioRecepcion = require('../db/models/MedioRecepcion');

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

    delete: (mediosName) => {
        return medioRecepcion.findOneAndDelete(mediosName)
        .then(result =>{
            return  result;
        })
        .catch(err =>{
            throw Error(err);
        })
    }
}

module.exports = MedioRecepcionUtil;