const denuncias = require('../db/models/Denuncia');

let DenunciaUtil ={
    get: ()=>{
        return denuncias.find() //Saca todos los denuncias
            .then( denuncias => {
                return denuncias;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    post: (newReporte) => {               //CREATE Reporte
        if (newReporte.rfcs.length === 0) throw Error( "No se pueden añadir denuncias sin RFCs asignados" )
        return denuncias.create(newReporte)
            .then( reporte => {
                return reporte;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    getbyId:(id) =>{
        return denuncias.findById(id) //Saca todos los admin
            .then( denuncia => {
                return denuncia;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    updateRfc: async(id, rfc)=>{
        try{
            const denuncia = await denuncias.findOne({ _id: id });
            if (denuncia.rfcs.some((e) => e.id == rfc.id)) {
                const index = denuncia.rfcs.findIndex(
                    (e) => e.id == rfc.id
                );
                denuncia.rfcs[index] = rfc
                await denuncia.save();
                return "success";
            } else {
                throw Error( "No existe ese rfc en la denuncia" );
            }
        }
        catch (error) {
            console.log(`Error updating rfcs for ${id}`, error);
            throw Error(error);
        }
        
    },
    addRfc: async(id, rfc) =>{
        try{
            const denuncia = await denuncias.findOne({ _id: id });
            rfc.forEach(element => {
                denuncia.rfcs.push(element)
            });
            await denuncia.save();
            return denuncia;
        }
        catch (error) {
            console.log(`Error adding rfcs for ${id}`, error);
            throw Error(error);
        }
    }

/*     deleteAll: () =>{
        return denuncias.deleteMany({})
        .then( reporte => {
            return reporte;
        })
        .catch( error => {
            throw Error( error );
        });
    } */
}

module.exports = DenunciaUtil;