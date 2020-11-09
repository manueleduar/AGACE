let express = require('express');
let router = express.Router();
let MedioRecepcion = require('../../models/MedioRecepcion');

router.get( "/", ( req, res, next ) => {  
    MedioRecepcion.get()
        .then( mediosRecepcion => {
            return res.status( 200 ).json( mediosRecepcion );
        })
        .catch( error => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try again later."
            })
        });
});

router.post( "/", ( req, res, next ) => {

    let medioRecepcion = {
        nombre : req.body.data
    }
    MedioRecepcion.post(medioRecepcion)
        .then(newMedioRecepcion => {
            return res.status(201).json(newMedioRecepcion);
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
    TemasList.deleteAll().then(newDenuncia => {
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