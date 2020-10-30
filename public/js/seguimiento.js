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