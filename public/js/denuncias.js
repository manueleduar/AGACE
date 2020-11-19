let catalogos = {};

$(document).ready(function() {
    $('select').formSelect();
});

function load (){
    verifyProfile()
    let count = 0;
    const addedRFCs = new Set();
    catalogos.temas = new Map();
    catalogos.administraciones = new Map();
    catalogos.insumos = new Map();
    catalogos.mediosRecepcion = new Map();
    $.ajax({
        type: 'GET',
        url: '/api/temas'
    }).done(data =>{
        data.forEach(element => {
            catalogos.temas.set(element._id, element);
            $("#temaSelect").append(
                '<option value = "'+element._id+'">' + element.nombre + '</option>'
            )
        });
    }).then( () =>{
        $('select').formSelect();
    });

    $.ajax({
        type: 'GET',
        url: '/api/administraciones'
    }).done(data =>{
        data.forEach(element => {
            catalogos.administraciones.set(element._id, element);
            $("#adm").append(
                '<option value = "'+element._id+'">' + element.nombre + '</option>'
            )
        });
    }).then( () =>{
        $('select').formSelect();
    });

    $.ajax({
        type: 'GET',
        url: '/api/insumos'
    }).done(data =>{
        data.forEach(element => {
            catalogos.insumos.set(element._id, element);
            $("#orig").append(
                '<option value = "'+element._id+'">' + element.nombre + '</option>'
            )
        });
    }).then( () =>{
        $('select').formSelect();
    });

    $.ajax({
        type: 'GET',
        url: '/api/medios_recepcion'
    }).done(data =>{
        data.forEach(element => {
            catalogos.mediosRecepcion.set(element._id, element);
            $("#medio").append(
                '<option value = "'+element._id+'">' + element.nombre + '</option>'
            )
        });
    }).then( () =>{
        $('select').formSelect();
    });

    

    $('#denunciaBtn').on('click', function(e){
        e.preventDefault();
        const temaID = $('#temaSelect').val();
        const tema = catalogos.temas.get(temaID);

        const adminID = $('#adm').val();
        const admin = catalogos.administraciones.get(adminID);

        const originID = $('#orig').val();
        const origin = catalogos.insumos.get(originID);

        const medioRecepcionID = $('#medio').val();
        const medioRecepcion = catalogos.mediosRecepcion.get(medioRecepcionID);
        let rfcs = [];
        let rfcValidate = true;
        if(!validateForm())
            return 0;
        addedRFCs.forEach(rfc =>{
            let admin = $('#adm'+rfc);
            if($("#rfc"+rfc).hasClass("invalid")){
                rfcValidate = false;
            }
            else if(!admin.val()){
                admin.parent().removeClass("valid");
                admin.parent().addClass("invalid");
                rfcValidate = false;
            }
            else{
                admin.parent().removeClass("invalid");
                admin.parent().addClass("valid");
            }
            adminAsignada = catalogos.administraciones.get(admin.val());
            rfcs.push(
                {
                    rfc: $("#rfc"+rfc).val(),
                    tipo: $("#tipo"+rfc).val(),
                    fecha: new Date(), 
                    administracionAsignada: adminAsignada, 
                    estatus: undefined,  // TODO: Preguntar
                    idprog: undefined, // TODO: Preguntar
                    causaRechazo: undefined, // TODO: Preguntar
                }
            )
        });

        if(rfcValidate == false)
            return 0;
        var files = $('#archivos')[0].files;
        var form = new FormData();
        var fileNames = []
        for( let i=0; i<files.length; i++){
            fileNames.push(files[i].name)
            form.append('files[]', files[i]);
        }
      
        let sendData = {
            descripcion: $('#desc').val(),
            tema: tema,
            adminstracionLider: admin,
            origen: origin,
            medioRecepcion: medioRecepcion,
            rfcs : rfcs,
            documentos: fileNames
        };
        sendData = JSON.stringify(sendData);

        $.ajax({
            url: '/api/denuncias',
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: sendData,
            success:function(){
                console.log()
                // Whatever you want to do after the form is successfully submitted
            }
        }).done( data =>{
            $.ajax({
                url: '/api/denuncias/archivo?id='+data._id,
                type: 'post',
                enctype: 'multipart/form-data',
                data: form,
                processData: false, 
                cache: false,
                contentType: false 
            }).done( data =>{
                window.location = '/seguimiento';
            });
        });
    });

    $("#addRFC").click( (e) =>{
        e.preventDefault();
        count++;
        addedRFCs.add(count);
        $("#rfcs").append('<div class="row" id="r'+count+'"> '+
            '<div class="input-field col s4">'+
                '<select id="adm'+count+'">'+
                '<option value="" disabled selected>Elige la Administración Asignada</option>'+
                '</select>'+
                '<label>Administracion Asignada</label>'+
           ' </div>'+
            '<div class="input-field col s3 rfcss">'+
            '<input  id="rfc'+count+'" type="text" class="rfcInp" maxlength = "13" >'+
            '<label for="rfc'+count+'">RFC</label>'+
            '</div>'+
            '<div class="input-field col s2">'+
            '<input disabled id="tipo'+count+'" value="" type="text" >'+
            '<label for="tipo'+count+'">Tipo</label>'+
            '</div>'+
            '<div class="input-field col s2">'+
            '<a class="btn-floating btn-small waves-effect waves-light red removeRFC" id="b'+count+'"><i class="material-icons">clear</i></a>'+
            '</div>'+
        '</div>')
        let select = document.getElementById('adm'+count);
        catalogos.administraciones.forEach(administracion => {
            let opt = document.createElement('option');
            opt.value = administracion._id;
            opt.innerHTML = administracion.nombre;
            select.appendChild(opt);
        })
        $('select').formSelect();
        $('.rfcss > input').characterCounter();

    });

    $("#rfcs").on("click", ".removeRFC", function(){
        let id = $(this).attr('id');
        id = id.slice(1);
        remove(id);
        addedRFCs.delete(Number(id));
    });

    $("#rfcs").on("keyup focusout", ".rfcInp",  (e) => {
        let id = e.target.id;
        id = id.slice(3);
        let rfc = $("#rfc"+id);
        let rfcLen =  rfc.val().length;

        if (rfcLen < 12) {
            $("#tipo"+id).val("");
            rfc.removeClass("valid");
            rfc.addClass("invalid");
        }
        else{
            rfc.removeClass("invalid");
            rfc.addClass("valid");
            if(rfcLen == 12){
                $("#tipo"+id).val("Moral");
            }
            else if (rfcLen == 13){
                $("#tipo"+id).val("Fisica");
            }
        }
        M.updateTextFields();

    });
}

function remove(id){
    $("#r"+id).fadeOut(300, function() { 
        $(this).remove(); 
    })
}

function validateForm(){
    if(!$('#desc').val().length){
        $('#desc').removeClass("valid");
        $('#desc').addClass("invalid");
        return false;
    }
    $('#desc').removeClass("invalid");
    $('#desc').addClass("valid");

    if(!$('#temaSelect').val()){
        $('#temaSelect').parent().removeClass("valid");
        $('#temaSelect').parent().addClass("invalid");
        return false;
    }
    $('#temaSelect').parent().removeClass("invalid");
    $('#temaSelect').parent().addClass("valid");

    if(!$('#adm').val()){
        $('#adm').parent().removeClass("valid");
        $('#adm').parent().addClass("invalid");
        return false;
    }
    $('#adm').parent().removeClass("invalid");
    $('#adm').parent().addClass("valid");

    if(!$('#orig').val()){
        $('#orig').parent().removeClass("valid");
        $('#orig').parent().addClass("invalid");
        return false;
    }
    $('#orig').parent().removeClass("invalid");
    $('#orig').parent().addClass("valid");

    if(!$('#medio').val()){
        $('#medio').parent().removeClass("valid");
        $('#medio').parent().addClass("invalid");
        return false;
    }
    $('#medio').parent().removeClass("invalid");
    $('#medio').parent().addClass("valid");
       
    return true;
    
}

function verifyProfile(){
    let userId = window.localStorage.getItem("user");
    $.ajax({
        type: 'GET',
        url: '/api/user/'+userId
    }).done(user =>{
        console.log(user)
        adminAsignada = user.administracionAsignada.nombre;
        let profile = parseInt(user.profile)
        if(profile)
            $("#catalogoNav").hide()
        else if(profile == 0)
            $("#catalogoNav").show()
        
    });
}

load();

