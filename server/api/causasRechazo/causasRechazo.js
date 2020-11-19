let express = require('express');
let router = express.Router();
let CausaRechazoUtil = require('../../utils/causaRechazoUtil');

router.get( "/", ( req, res, next ) => {  
    CausaRechazoUtil.get()
        .then( causa => {
            return res.status( 200 ).json( causa );
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

    let causa = {
        nombre : req.body.data
    }
    CausaRechazoUtil.post(causa)
        .then(newCausa => {
            return res.status(201).json(newCausa);
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
    AdministracionUtil.deleteAll().then(newDenuncia => {
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
        message: "Missing ID for deleting administracion",
        status: 500
    })

    let causa = {
        _id : id
    }

    CausaRechazoUtil.delete(causa)
    .then(deletedCausa => {
        return res.status(201).json(deletedCausa);
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