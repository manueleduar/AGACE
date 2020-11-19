var adminAsignada; 

function load(){
    verifyProfile()
    $.ajax({
        type: 'GET',
        url: '/api/denuncias'
    }).done(data =>{
        data.forEach(element => {
            if (element.rfcs.some(e => e.administracionAsignada.nombre === adminAsignada)) {
                $("#denuncias").append(
                    '<tr>'+
                        '<td>'+element.tema.nombre+'</td>'+ 
                        '<td>'+element.descripcion+'</td>'+
                        '<td>'+element.admasignada+'</td>'+ //TODO
                        '<td>'+ calculateAdminRFC(element) +'</td>'+ //TODO
                        '<td>'+ calculateAvanceAdmin(element)+'%</td>'+//TODO
                        '<td>'+element.adminstracionLider.nombre+'</td>'+
                        '<td>'+element.rfcs.lenght+'</td>'+ //TODO
                        '<td>'+calculateAvanceTotal(element)+'%</td>'+//TODO
                        '<td> <a href="/detalles?id='+element._id+'" class="waves-effect waves-light btn">Detalles</a></td>'+
                    '</tr>'
                )
            }
        
        });
        
    });
}


function calculateAdminRFC(rfcs){
    const rfcAdmin = rfcs.filter(rfc => rfc.administracionAsignada === adminAsignada);
    return rfcAdmin.length
}

function calculateAvanceAdmin(rfcs){
    const rfcAdmin = rfcs.filter(rfc => rfc.administracionAsignada === adminAsignada);
    let listos = 0;
    rfcAdmin.forEach(rfc =>{
        if(rfc.procedio != undefined){
            listos++;   
        }
    });
    return (listos/rfcs.lenght)*100;
    
}

function calculateAvanceTotal(rfcs){
    let listos = 0;
    rfcs.forEach(rfc =>{
        if(rfc.procedio != undefined){
            listos++;   
        }
    });
    return (listos/rfcs.lenght)*100;
}

function verifyProfile(){
    let userId = window.localStorage.getItem("user");
    $.ajax({
        type: 'GET',
        url: '/api/user/'+userId
    }).done(user =>{
        console.log(user)
        adminAsignada = user.administracionAsignada.nombre;
        if(user.profile)
            $("#catalogoNav").hide()
        
    });
}

load();