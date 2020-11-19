const status = require('../db/models/Status');

let StatusUtil ={
    get: ()=>{
        return status.find() //Saca todos los admin
            .then( listaStatus => {
                return listaStatus;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    post: (newStatus) => {               //CREATE admin
        return status.create(newStatus)
            .then( listaStatus => {
                return listaStatus;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    getbyId:(id) =>{
        return status.findById(id) //Saca todos los admin
            .then( status => {
                return status;
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

    delete: (statusName) => {
        return status.findOneAndDelete(statusName)
        .then(result =>{
            return  result;
        })
        .catch(err =>{
            throw Error(err);
        })
    }
}

module.exports = StatusUtil;