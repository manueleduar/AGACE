const administracion = require('../db/models/Administracion');

let AdministracionUtil ={
    get: ()=>{
        return administracion.find() //Saca todos los admin
            .then( administraciones => {
                return administraciones;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    post: (newAdmin) => {               //CREATE admin
        return administracion.create(newAdmin)
            .then( administracion => {
                return administracion;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    getbyId:(id) =>{
        return administracion.findById(id) //Saca todos los admin
            .then( administracion => {
                return administracion;
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

    delete: (administracionName) => {
        return administracion.findOneAndDelete(administracionName)
        .then(result =>{
            return  result;
        })
        .catch(err =>{
            throw Error(err);
        })
    }
}

module.exports = AdministracionUtil