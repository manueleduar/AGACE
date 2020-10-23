let express = require('express');
let router = express.Router();
let {DenunciaLists} = require('../../models/Denuncia');
let bp = require('body-parser');
let jsonParser = bp.json();

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

router.post("/", jsonParser, (req, res, next) => {
    let newDenuncia = req.body;
    
    console.log(newDenuncia);
    if (!newDenuncia.tema ||
        !newDenuncia.descripcion ||
        !newDenuncia.admasignada ||
        !newDenuncia.rfc ||
        !newDenuncia.avance ||
        !newDenuncia.admlider ||
        !newDenuncia.rfctotales||
        !newDenuncia.avanceaccpce) {
        res.statusMessage = "Missing field in the body";
        return res.status(406).json( {
            message: "Missing field in the body",
            status: 406
        });
    }
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


module.exports = router;