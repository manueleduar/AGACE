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
router.get( "/:id", ( req, res, next ) => {
    const { id: denunciaId } = req.params;
    DenunciaUtil.getbyId(denunciaId)
        .then( denuncia => {
            return res.status( 200 ).json( denuncia );
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

router.post( "/addRfc/:id", ( req, res, next ) => {
    const { id: denunciaId } = req.params;
    const rfcs  = req.body;
    DenunciaUtil.addRfc(denunciaId, rfcs)
        .then( denuncia => {
            return res.status( 200 ).json( denuncia );
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


router.post( "/updateRFC/:id", ( req, res, next ) => {
    const { id: denunciaId } = req.params;
    let  rfc = req.body;
    DenunciaUtil.updateRfc(denunciaId, rfc)
        .then( denuncia => {
            return res.status( 200 ).json( denuncia );
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
        
        fstream = fs.createWriteStream(filesDirectory + '/files/' + id + '/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log('file ' + filename + ' uploaded');
        });
    });
    req.busboy.on('finish', function(){
        console.log('finished');
        return res.redirect('/seguimiento');
    });


});

router.get("/archivo/download", (req, res, next) => { 
    var id = req.query.id;
    var filename = req.query.filename;
    if (!fs.existsSync(filesDirectory + '/files/' + id  +"/"+filename)){
        return res.status(500).json({
            message: "No exsite el archivo " + id ,
            status: 500
        })
    } 
    res.download(filesDirectory + '/files/' + id  +"/"+filename);
});
router.delete("/:id", (req, res, next) => {
    let id = req.params.id;
    if (!id) return res.status(500).json({
        message: "Missing id for deleting denuncias",
        status: 500
    })

    let denuncia = {
        _id : id
    }

    DenunciaUtil.delete(denuncia)
    .then(deletedDenuncia => {
        return res.status(201).json(deletedDenuncia);
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