let express = require('express');
let router = express.Router();
let DenunciaUtil = require('../../utils/denunciaUtil');
let { nanoid } = require( 'nanoid');
const fs = require('fs');
const path = require('path');
const filesDirectory = path.resolve('./server');



router.get( "/", ( req, res, next ) => {  
    DenunciaUtil.get()
        .then( denuncias => {
            return res.status( 200 ).json( denuncias );
        })
        .catch( error => {
            console.log(error);
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try again later."
            })
        });
    
    
});

router.post("/", (req, res, next) => {
    let newDenuncia = req.body;

    if (!newDenuncia.tema ||
        !newDenuncia.descripcion ||
        !newDenuncia.origen ||
        !newDenuncia.adminstracionLider ||
        !newDenuncia.medioRecepcion ) {
        res.statusMessage = "Missing field in the body";
        return res.status(406).json( {
            message: "Missing field in the body",
            status: 406
        });
    }
    newDenuncia.fecha = new Date();
    newDenuncia.rfcs.forEach(element => {
        element.id = nanoid(8);
    });
    DenunciaUtil.post(newDenuncia)
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

router.post("/archivo", (req, res, next) => { 
    var fstream;
    var id = req.query.id;
    console.log(id)
    if (!fs.existsSync(filesDirectory + '/files/' + id  +"/")){
        fs.mkdirSync(filesDirectory + '/files/' + id +"/",  {recursive: true});
    }
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        
        fstream = fs.createWriteStream(filesDirectory + '/files/' +  id + '/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            return res.redirect('/seguimiento');
        });
    });


});
/* router.post("/del", (req, res, next) => {
    DenunciaUtil.deleteAll().then(newDenuncia => {
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