const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Insumo = new Schema({
    nombre: String
});

let insumo = mongoose.model('insumos', Insumo, 'insumos');

let InsumoUtil ={
    get: ()=>{
        return insumo.find() //Saca todos los admin
            .then( insumos => {
                return insumos;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    post: (newAdmin) => {               //CREATE admin
        return insumo.create(newAdmin)
            .then( insumo => {
                return insumo;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    getbyId:(id) =>{
        return insumo.findById(id) //Saca todos los admin
            .then( insumo => {
                return insumo;
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

module.exports = InsumoUtil