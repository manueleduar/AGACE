const { count } = require('console');
const xl = require('excel4node');
const { parse } = require('path');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name');
const DenunciaUtil = require('../utils/denunciaUtil');

let excelService = {
    data: [
     {
        "name":"Shadab Shaikh",
        "email":"shadab@gmail.com",
        "mobile":"1234567890"
     }
    ],
    // TODO: Anadir funcionalidad documentos adjuntos 
    headingColumnNames: [
        "ID Tema",
        "Fecha de registro tema",
        "Administración Lider",
        "Tema",
        "Descripción Tema",
        "Origen de Insumo",
        "Medio de recpeción",
        // "Documento Adjunto",
        "ID Insumo",
        "Fecha registro Insumo",
        "Administración Asignada",
        "RFC",
        "Tipo Persona",
        // "Estatus",
        // "Procedió",
        // "ID Programación",
        // "Causa Rechazo",
        // "Observaciones"
        
    ],

    getData() {

        return DenunciaUtil.get().then(denuncias => {
            // console.log(denuncias);
            return denuncias.map(denuncia => {
                let parsedResult = new Map();
                parsedResult.set( "id", denuncia._id.toString() );

                denuncia.createdAt ? 
                    parsedResult.set( "fechaRegistro", denuncia.createdAt.toString() ) :
                    parsedResult.set( "fechaRegistro", denuncia.fecha.toString() );

                denuncia.adminstracionLider ?
                    parsedResult.set( "administracionLider", denuncia.adminstracionLider.nombre ) :
                    parsedResult.set( "administracionLider", "NA" );

                denuncia.tema ?
                    parsedResult.set( "tema", denuncia.tema.nombre ) :
                    parsedResult.set( "tema", "NA" );

                parsedResult.set( "descripcion", denuncia.descripcion );

                denuncia.origen ?
                    parsedResult.set( "origenInsumo", denuncia.origen.nombre ) :
                    parsedResult.set( "origenInsumo", "NA" );

                denuncia.medioRecepcion ?
                    parsedResult.set( "medioRecepcion", denuncia.medioRecepcion.nombre ) :
                    parsedResult.set( "medioRecepcion", "NA" );

                let rfcs = [];

                denuncia.rfcs.forEach(rfc => {
                    let rfcTemp = new Map();
                    rfcTemp.set( "id", rfc._id.toString() );
                    rfc.createdAt ? 
                        rfcTemp.set( "fechaRegistro", rfc.createdAt.toString() ) :
                        rfcTemp.set( "fechaRegistro", rfc.fecha.toString() );

                    rfc.administracionAsignada ?
                        rfcTemp.set( "administracionAsignada", rfc.administracionAsignada.nombre ) :
                        rfcTemp.set( "administracionAsignada", "NA" );

                    rfcTemp.set( "rfc", rfc.rfc );
                    rfcTemp.set( "tipoPersona", rfc.tipo );

                    // TODO: AÑANDIR LO FALTANTE DE ESTAUTUS, PROCEDIO ID PROG, CAUSA RECHAZO, OBSERVACIONES.
                    
                    rfcs.push(rfcTemp);
                });

                parsedResult.set( "rfcs", rfcs );
                
                // parsedResult.set( id, denuncia._id );
                // parsedResult.set( id, denuncia._id );
                // parsedResult.set( id, denuncia._id );
                // parsedResult.set( id, denuncia._id );

                return parsedResult;

            });
        })
            

    },
    
    async generateWorkbook(params) {
        //Write Column Title in Excel file
        let headingColumnIndex = 1;
        this.headingColumnNames.forEach(heading => {
            ws.cell(1, headingColumnIndex++)
                .string(heading)
        })
        

        await this.getData().then( (data) => {
            // console.log(data)
            rowIndex = 2;
            data.forEach( entry => {
                entry.get("rfcs").forEach(rfc => {
                    let columnIndex = 1;
                    entry.forEach(value =>{
                        // console.log(value, typeof value);
                        ws.cell(rowIndex,columnIndex++)
                            .string(value)
                    });
                    columnIndex--;
                    rfc.forEach(value =>{
                        // console.log(value, typeof value);
                        ws.cell(rowIndex,columnIndex++)
                            .string(value)
                    });
                    rowIndex++;
                })
            }); 
        });
        return wb;

        //Write Data in Excel file
        // wb.write('TeacherData.xlsx');
    }

}


module.exports = excelService;

