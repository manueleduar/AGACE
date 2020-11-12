let express = require('express');
let router = express.Router();
let MedioRecepcionUtil = require('../../utils/medioRecepcionUtil');

router.get( "/", ( req, res, next ) => {  
    MedioRecepcionUtil.get()
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

    let nombre = req.body.data;
    if (!nombre) return res.status(500).json({
        message: "Missing name for medio de recepcion",
        status: 500
    })
    let medioRecepcion = {
        nombre : nombre
    }
    MedioRecepcionUtil.post(medioRecepcion)
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
    MedioRecepcionUtil.deleteAll().then(newDenuncia => {
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

router.patch("/deleteOne", (req, res, next) => {
    let id = req.body.data;
    if (!id) return res.status(500).json({
        message: "Missing name for deleting medio",
        status: 500
    })

    let medio = {
        _id : id
    }

    MedioRecepcionUtil.delete(medio)
    .then(deletedMedio => {
        return res.status(201).json(deletedMedio);
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

module.exports = router;