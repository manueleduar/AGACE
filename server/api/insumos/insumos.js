let express = require('express');
let router = express.Router();
let InsumoUtil = require('../../utils/insumoUtil');

router.get( "/", ( req, res, next ) => {  
    InsumoUtil.get()
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

    let nombre = req.body.data;
    if (!nombre) return res.status(500).json({
        message: "Missing name for insumo",
        status: 500
    })

    let insumo = {
        nombre : nombre
    }
    InsumoUtil.post(insumo)
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
    InsumoUtil.deleteAll().then(newDenuncia => {
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
        message: "Missing name for deleting insumo",
        status: 500
    })

    let insumo = {
        _id : id
    }

    InsumoUtil.delete(insumo)
    .then(deletedInsumo => {
        return res.status(201).json(deletedInsumo);
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