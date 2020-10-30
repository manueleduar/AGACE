let express = require('express');
let router = express.Router();
let {DenunciaLists} = require('../../models/Denuncia');
let {TemasList} = require('../../models/Tema');
let { nanoid } = require( 'nanoid');



router.get( "/", ( req, res, next ) => {  
    DenunciaLists.get()
        .then( denuncias => {
            return res.status( 200 ).json( denuncias );
        })
        .catch( error => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try again later."
            })
        });
    
    
});

router.post("/", (req, res, next) => {
    let newDenuncia = req.body;
    console.log(newDenuncia);

    if (!newDenuncia.tema ||
        !newDenuncia.descripcion ||
        !newDenuncia.origen ||
        !newDenuncia.adminstracionLider ||
        !newDenuncia.medioRecepcion ) {
        res.statusMessage = "Missing field in the body";
        return res.status(406).json( {
            message: "Missing field in the body",
            status: 406
        });
    }
    newDenuncia.fecha = new Date();
    newDenuncia.rfcs.forEach(element => {
        element.id = nanoid(8);
    });
    console.log(newDenuncia);
    DenunciaLists.post(newDenuncia)
        .then(newDenuncia => {
            return res.status(201).json(newDenuncia);
        })
        .catch(err => {
            res.statusMessage = err;
            console.log(err)

            return res.status(500).json({
                message: err,
                status: 500
            })
        });
});
/* router.post("/del", (req, res, next) => {
    DenunciaLists.deleteAll().then(newDenuncia => {
        return res.status(201).json(newDenuncia);
    })
    .catch(err => {
        res.statusMessage = err;
        console.log(err)

        return res.status(500).json({
            message: err,
            status: 500
        })
    });
}); */


module.exports = router;