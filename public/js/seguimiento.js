
function load(){
    verifyProfile().then( userInfo =>{
        adminAsignada = userInfo.adminAsig
        $.ajax({
            type: 'GET',
            url: '/api/denuncias'
        }).done(data =>{
            data.forEach(element => {
                if (element.rfcs.some(e => e.administracionAsignada && e.administracionAsignada.nombre === adminAsignada ) || element.adminstracionLider.nombre === adminAsignada) {
                    $("#denuncias").append(
                        '<tr>'+
                            '<td>'+element.tema.nombre+'</td>'+ 
                            '<td>'+element.descripcion+'</td>'+
                            '<td>'+adminAsignada+'</td>'+ //TODO
                            '<td>'+ calculateAdminRFC(element.rfcs, adminAsignada) +'</td>'+ //TODO
                            '<td>'+ calculateAvanceAdmin(element.rfcs, adminAsignada)+'%</td>'+//TODO
                            '<td>'+element.adminstracionLider.nombre+'</td>'+
                            '<td>'+element.rfcs.length+'</td>'+ //TODO
                            '<td>'+calculateAvanceTotal(element.rfcs)+'%</td>'+//TODO
                            '<td> <a href="/detalles?id='+element._id+'" class="waves-effect waves-light btn">Detalles</a></td>'+
                        '</tr>'
                    )
                }
                else if(userInfo.profile == 0){
                    $("#denuncias").append(
                        '<tr>'+
                            '<td>'+element.tema.nombre+'</td>'+ 
                            '<td>'+element.descripcion+'</td>'+
                            '<td>'+adminAsignada+'</td>'+ //TODO
                            '<td> -- </td>'+ //TODO
                            '<td> -- </td>'+//TODO
                            '<td>'+element.adminstracionLider.nombre+'</td>'+
                            '<td>'+element.rfcs.length+'</td>'+ //TODO
                            '<td>'+calculateAvanceTotal(element.rfcs)+'%</td>'+//TODO
                            '<td> <a href="/detalles?id='+element._id+'" class="waves-effect waves-light btn">Detalles</a></td>'+
                        '</tr>'
                    )
                }
            
            });
        });
    })
    
}


function calculateAdminRFC(rfcs, adminAsignada){
    const rfcAdmin = rfcs.filter(rfc => rfc.administracionAsignada.nombre === adminAsignada);
    return rfcAdmin.length
}

function calculateAvanceAdmin(rfcs, adminAsignada){
    const rfcAdmin = rfcs.filter(rfc => rfc.administracionAsignada.nombre === adminAsignada);
    let listos = 0;
    rfcAdmin.forEach(rfc =>{
        if(rfc.procedio != undefined){
            listos++;   
        }
    });
    return rfcAdmin.length == 0 ? "--" : (listos/rfcs.length)*100;
    
}

function calculateAvanceTotal(rfcs){
    let listos = 0;
    rfcs.forEach(rfc =>{
        if(rfc.procedio != undefined){
            listos++;   
        }
    });
    return (listos/rfcs.length)*100;
}

var verifyProfile = () =>{
    return new Promise((resolve, reject) => {
        let userId = window.localStorage.getItem("user");
        $.ajax({
            type: 'GET',
            url: '/api/user/'+userId
        }).done(user =>{
            let profile = parseInt(user.profile)
            if(profile)
                $("#catalogoNav").hide()
            else if(profile == 0)
                $("#catalogoNav").show()
            let userInfo = {profile : profile, adminAsig : user.administracionAsignada.nombre}
            resolve (userInfo);
        });
    });
}

load();