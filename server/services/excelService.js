const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name');

let excelService = {
    data: [
     {
        "name":"Shadab Shaikh",
        "email":"shadab@gmail.com",
        "mobile":"1234567890"
     }
    ],
    headingColumnNames: [
        "ID Tema",
        "Fecha de registro tema",
        "Administración Lider",
        "Tema",
        "Descripción Tema",
        "Origen de Insumo",
        "Medio de recpeción",
        "Documento Adjunto",
        "ID Insumo",
        "Fecha registro Insumo",
        "Administración Asignada",
        "RFC",
        "Tipo Persona",
        "Estatus",
        "Procedió",
        "ID Programación",
        "Causa Rechazo",
        "Observaciones"
        
    ],
    
    generateWorkbook(params) {
        //Write Column Title in Excel file
        let headingColumnIndex = 1;
        this.headingColumnNames.forEach(heading => {
            ws.cell(1, headingColumnIndex++)
                .string(heading)
        });
        
        //Write Data in Excel file
        rowIndex = 2;
        // this.data.forEach( record => {
        //     let columnIndex = 1;
        //     Object.keys(record ).forEach(columnName =>{
        //         ws.cell(rowIndex,columnIndex++)
        //             .string(record [columnName])
        //     });
        //     rowIndex++;
        // }); 
        // wb.write('TeacherData.xlsx');
        return wb;
    }

}


module.exports = excelService;

