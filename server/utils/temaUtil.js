const temas = require('../db/models/Tema');

let TemaUtil ={
    get: ()=>{
        return temas.find() //Saca todos los temas
            .then( temas => {
                return temas;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    post: (newTema) => {               //CREATE tema
        return temas.create(newTema)
            .then( tema => {
                return tema;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    getbyId:(id) =>{
        return temas.findById(id) //Saca todos los temas
            .then( tema => {
                return tema;
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

module.exports = TemaUtil;