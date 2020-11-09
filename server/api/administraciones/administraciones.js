let express = require('express');
let router = express.Router();
let Administracion = require('../../models/Administracion');

router.get( "/", ( req, res, next ) => {  
    Administracion.get()
        .then( admin => {
            return res.status( 200 ).json( admin );
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

    let admin = {
        nombre : req.body.data
    }
    Administracion.post(admin)
        .then(newAdmin => {
            return res.status(201).json(newAdmin);
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