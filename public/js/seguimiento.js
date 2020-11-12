function load(){
    $.ajax({
        type: 'GET',
        url: '/api/denuncias'
    }).done(data =>{
        data.forEach(element => {
            $("#denuncias").append(
                '<tr>'+
                    '<td>'+element.tema.nombre+'</td>'+ 
                    '<td>'+element.descripcion+'</td>'+
                    '<td>'+element.admasignada+'</td>'+ //TODO
                    '<td>'+element.rfcs.length+'</td>'+ //TODO
                    '<td>'+element.avance+'%</td>'+//TODO
                    '<td>'+element.adminstracionLider.nombre+'</td>'+
                    '<td>'+element.rfcs.length+'</td>'+ //TODO
                    '<td>'+element.avanceaccpce+'%</td>'+//TODO
                    '<td> <a href="/detalles?id='+element._id+'" class="waves-effect waves-light btn">Detalles</a></td>'+
                '</tr>'
            )

        });
        
    });
}

load();