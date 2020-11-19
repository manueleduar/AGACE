const causaRechazo = require('../db/models/CausaRechazo');

let CausaRechazoUtil ={
    get: ()=>{
        return causaRechazo.find() //Saca todos los admin
            .then( causasRechazo => {
                return causasRechazo;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    post: (newCausaRechazo) => {               //CREATE admin
        return causaRechazo.create(newCausaRechazo)
            .then( causasRechazo => {
                return causasRechazo;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    getbyId:(id) =>{
        return causaRechazo.findById(id) //Saca todos los admin
            .then( causaRechazo => {
                return causaRechazo;
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

    delete: (causaRechazoName) => {
        return causaRechazo.findOneAndDelete(causaRechazoName)
        .then(result =>{
            return  result;
        })
        .catch(err =>{
            throw Error(err);
        })
    }
}

module.exports = CausaRechazoUtil;