let express = require('express');
let router = express.Router();
let UserUtil = require('../../utils/userUtil');


router.get( "/:id", ( req, res, next ) => {
    const { id: userId } = req.params;
    UserUtil.getById(userId)
        .then( user => {
            return res.status( 200 ).json( user );
        })
        .catch( error => {
            console.log(error);
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try agaisn later."
            })
        });
});

router.get( "/", ( req, res, next ) => {
    UserUtil.get()
        .then( users => {
            return res.status( 200 ).json( users );
        })
        .catch( error => {
            console.log(error);
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try agaisn later."
            })
        });
});

router.patch("/deleteOne", (req, res, next) => {
    let id = req.body.data;
    if (!id) return res.status(500).json({
        message: "Missing name for deleting tema",
        status: 500
    })

    let user = {
        _id : id
    }

    UserUtil.delete(user)
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