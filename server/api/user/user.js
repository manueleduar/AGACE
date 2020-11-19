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

module.exports = router;