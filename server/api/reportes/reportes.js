let express = require('express');
let router = express.Router();
const xl = require('excel4node');
const excelService = require('../../services/excelService');
const workbook = require('excel4node/distribution/lib/workbook');

router.get( "/", ( req, res, next ) => {  
    let wb = _generateWorkbook();
    _sendWorkbook(wb, res);
});

function _generateWorkbook() {
    
    return excelService.generateWorkbook();
    
}
function _sendWorkbook(workbook, response) { 
    var fileName = 'Reporte.xlsx';

    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    workbook.write(fileName, response);
}

module.exports = router;