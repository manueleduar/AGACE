let express = require('express');
let router = express.Router();
const xl = require('excel4node');
const excelService = require('../../services/excelService');
const workbook = require('excel4node/distribution/lib/workbook');

router.get( "/", async ( req, res, next ) => {  
    let wb = await _generateWorkbook();
    _sendWorkbook(wb, res);
});

async function _generateWorkbook() {
    
    return await excelService.generateWorkbook();
    
}
function _sendWorkbook(workbook, response) { 
    var fileName = 'Reporte.xlsx';

    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    workbook.write(fileName, response);
}

module.exports = router;