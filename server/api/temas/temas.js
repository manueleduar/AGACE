let express = require('express');
let router = express.Router();
let {TemasList} = require('../../models/Tema');


router.get( "/", ( req, res, next ) => {  
    TemasList.get()
        .then( temas => {
            return res.status( 200 ).json( temas );
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
    console.log(req.query.tema)
    let tema = {
        nombre : req.query.tema}
    TemasList.post(tema)
        .then(newTema => {
            return res.status(201).json(newTema);
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