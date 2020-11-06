function load(){
    $.ajax({
        type: 'GET',
        url: '/api/denuncias'
    }).done(data =>{
        console.log(data)
        data.forEach(element => {
            $("#denuncias").append(
                '<tr>'+
                    '<td>'+element.tema.nombre+'</td>'+
                    '<td>'+element.descripcion+'</td>'+
                    '<td>'+element.admasignada+'</td>'+
                    '<td>'+element.rfcs.length+'</td>'+
                    '<td>'+element.avance+'%</td>'+
                    '<td>'+element.admlider+'</td>'+
                    '<td>'+element.rfcs.length+'</td>'+
                    '<td>'+element.avanceaccpce+'%</td>'+
                    '<td> <a class="waves-effect waves-light btn">Editar</a></td>'+
                '</tr>'
            )

        });
        
    });
}

load();

let generarReportesBtn = document.getElementById("generar-reportes");

if (generarReportesBtn){
    generarReportesBtn.addEventListener('click',(event) => {
        var request = new XMLHttpRequest();
        request.open('GET', '/api/reportes', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.responseType = 'blob';
        
        request.onload = function(e) {
            if (this.status === 200) {
                var blob = this.response;
                if(window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveBlob(blob, 'Reporte.xlsx');
                }
                else{
                    var downloadLink = window.document.createElement('a');
                    var contentTypeHeader = request.getResponseHeader("Content-Type");
                    downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
                    downloadLink.download = 'Reporte.xlsx';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                   }
               }
           };
           request.send();
    }) 
}