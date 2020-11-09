let express = require('express');
let router = express.Router();
let Insumo = require('../../models/Insumo');

router.get( "/", ( req, res, next ) => {  
    Insumo.get()
        .then( insumo => {
            return res.status( 200 ).json( insumo );
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

    let insumo = {
        nombre : req.body.data
    }
    Insumo.post(insumo)
        .then(newInsumo => {
            return res.status(201).json(newInsumo);
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