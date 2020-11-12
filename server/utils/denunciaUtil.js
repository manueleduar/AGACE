const denuncias = require('../db/models/Denuncia');

let DenunciaUtil ={
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
/*     deleteAll: () =>{
        return denuncias.deleteMany({})
        .then( reporte => {
            return reporte;
        })
        .catch( error => {
            throw Error( error );
        });
    } */
}

module.exports = DenunciaUtil;