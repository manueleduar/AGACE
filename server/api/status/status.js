let express = require('express');
let router = express.Router();
let StatusUtil = require('../../utils/statusUtil');

router.get( "/", ( req, res, next ) => {  
    StatusUtil.get()
        .then( status => {
            return res.status( 200 ).json( status );
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

    let status = {
        nombre : req.body.data
    }
    StatusUtil.post(status)
        .then(newStatus => {
            return res.status(201).json(newStatus);
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

    let status = {
        _id : id
    }

    StatusUtil.delete(status)
    .then(deletedStatus => {
        return res.status(201).json(deletedStatus);
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