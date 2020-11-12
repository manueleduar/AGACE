let express = require('express');
let router = express.Router();
let TemaUtil = require('../../utils/temaUtil');


router.get( "/", ( req, res, next ) => {  
    TemaUtil.get()
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
    let nombre = req.body.data;
    if (!nombre) return res.status(500).json({
        message: "Missing name for tema",
        status: 500
    })
    let tema = {
        nombre : nombre
    }
    TemaUtil.post(tema)
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
    TemaUtil.deleteAll().then(newDenuncia => {
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
    let nombre = req.body.data;
    if (!nombre) return res.status(500).json({
        message: "Missing name for deleting tema",
        status: 500
    })

    let tema = {
        nombre : nombre
    }

    TemaUtil.delete(tema)
    .then(deletedTema => {
        return res.status(201).json(deletedTema);
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