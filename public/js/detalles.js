const months = [
     'enero',
     'febrero',
     'marzo',
     'abril',
     'mayo',
     'junio',
     'julio',
     'agosto',
    'semptiembre',
     'octubre',
     'noviembre',
     'diciembre'
]

let catalogos = {};
let allRFCs = {};
var id;
var adminUser;
var adminLider;

$(document).ready(function() {
    $('select').formSelect();
});



function load(){
    let count = 0;
    const addedRFCs = new Set();
    catalogos.administraciones = new Map();
    catalogos.status = new Map();
    catalogos.rechazo = new Map();
    var url = new URL(window.location.href);
    id = url.searchParams.get("id");
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
        url: '/api/status'
    }).done(data =>{
        data.forEach(element => {
            catalogos.status.set(element._id, element);
            $("#estatus").append(
                '<option value = "'+element._id+'">' + element.nombre + '</option>'
            )
        });
    }).then( () =>{
        $('select').formSelect();
    });
    $.ajax({
        type: 'GET',
        url: '/api/causasRechazo'
    }).done(data =>{
        data.forEach(element => {
            catalogos.rechazo.set(element._id, element);
            $("#causaRechazo").append(
                '<option value = "'+element._id+'">' + element.nombre + '</option>'
            )
        });
    }).then( () =>{
        $('select').formSelect();
    });

    verifyProfile().then( userInfo =>{
        adminUser = userInfo

        $.ajax({
            type: 'GET',
            url: '/api/denuncias/'+id
        }).done(data =>{
            var fecha = new Date(data.fecha)
            adminLider = data.adminstracionLider.nombre
            $("#denuncias").append(
                '<tr>'+
                    '<td>'+data.tema.nombre+'</td>'+ 
                    '<td>'+data.descripcion+'</td>'+
                    '<td>'+fecha.getDate()+ ' '+ months[fecha.getMonth()]+ ' '+fecha.getFullYear()+'</td>'+
                    '<td>'+data.adminstracionLider.nombre+'</td>'+
                    '<td>'+data.origen.nombre+'</td>'+
                    '<td>'+data.medioRecepcion.nombre+'</td>'+
                    '<td id="documentos"></td>'+
                '</tr>'
            );
            data.documentos.forEach(element => {
                $("#documentos").append(
                    '<a href="/api/denuncias/archivo/download?id='+id+'&filename='+element+'" download>'+element+'</a><br>'
                )            
            })
            
            loadRFCs(data.rfcs)
            showDelete();
            
            
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
        $('#agregarRfc').show();
    });

    $('#agregarBtn').on('click', function(e){
        e.preventDefault();
        let rfcValidate = true;
        let rfcs = [];

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
                    estatus: '',  // TODO: Preguntar
                    idprog: '', // TODO: Preguntar
                    causaRechazo: '', // TODO: Preguntar
                }
            )
        });
        if(rfcValidate == false)
            return 0;

        sendRFCs = JSON.stringify(rfcs);
        $.ajax({
            url: '/api/denuncias/addRfc/'+id,
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: sendRFCs,
            success:function(){
                console.log()
                // Whatever you want to do after the form is successfully submitted
            }
        }).done(data =>{
            loadRFCs(rfcs)
            $("#rfcs").empty()
            $('#agregarRfc').hide();
        });
    
    });

    $('#guardarBtn').on('click', function(e){
        e.preventDefault();
        let rfcSelect = allRFCs[$('#rfcSelect').val()]
        let estatus = catalogos.status.get($('#estatus').val());
        let rechazo = catalogos.rechazo.get($('#causaRechazo').val());
        let sendData = {
            id: rfcSelect.id,
            rfc: rfcSelect.rfc,
            tipo: rfcSelect.tipo,
            fecha: rfcSelect.fecha,
            administracionAsignada: rfcSelect.administracionAsignada, 
            estatus: estatus,  // TODO: Preguntar
            idprog: $('#idprog').val(), // TODO: Preguntar
            procedio: $('#procedio').val()  == "Si" ? true : false,
            causaRechazo:  $('#procedio').val()  == "Si" ? undefined : rechazo, // TODO: Preguntar
            observaciones: [$('#obser').val()]
        };
        sendData = JSON.stringify(sendData);

        $.ajax({
            url: '/api/denuncias/updateRFC/'+id,
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: sendData,
            success:function(){
                console.log()
                // Whatever you want to do after the form is successfully submitted
            }
        }).done(data =>{
            $('#modal1').modal();
            $('#modal1').modal('open');
            console.log("AAAA")
        });
    
    });

    
    $('#rfcSelect').on('change', function() {
        checkRFCSelect()
    });

    $('#procedio').on('change', function() {
        showProcedio()
    });



    $("#rfcs").on("click", ".removeRFC", function(){
        let id = $(this).attr('id');
        id = id.slice(1);
        remove(id);
        addedRFCs.delete(Number(id));
        if(!addedRFCs.size)
            $('#agregarRfc').hide();

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

function checkRFCSelect(){
    let value = $('#rfcSelect').val()
    if(value != null && value.length){
        var rfcSelect = allRFCs[value]
        $(".rfcDepend").show()

        if(rfcSelect.estatus)
            $("#estatus").val(rfcSelect.estatus._id)

        if(rfcSelect.procedio){
            $("#procedio").val("Si")
            $("#causaRechazoDiv").hide()
            $("#idprog").val(rfcSelect.idprog)
            $("#idprogDiv").show()
        }
        else if(rfcSelect.procedio == false){
            $("#procedio").val("No")
            $("#idprogDiv").hide()

            if(rfcSelect.causaRechazo)
                $("#causaRechazo").val(rfcSelect.causaRechazo._id)
            $("#causaRechazoDiv").show()
            $('select').formSelect();
        }
        else{
            $("#procedio").val("")
            $("#idprogDiv").hide()
            $("#causaRechazoDiv").hide()
        }
        if(rfcSelect.rfc.length == 12){
            $("#tipo").val("Moral");
        }
        else if (rfcSelect.rfc.length == 13){
            $("#tipo").val("Fisica");
        }
        $("#obser").val(rfcSelect.observaciones)
        M.updateTextFields();
        $('select').formSelect();


    }
}

function showProcedio(){
    $("#idprogDiv").hide()
    $("#causaRechazoDiv").hide()
    if($('#procedio').val() == "No"){
        $("#idprogDiv").hide()
        $("#causaRechazoDiv").show()
    }
    else if($('#procedio').val() == "Si"){
        $("#causaRechazoDiv").hide()
        $("#idprogDiv").show()
        $('.idprogDiv > input').characterCounter();
    
    }    
}


function loadRFCs(rfcs){
    if(adminUser.profile == 0 || adminUser.adminAsig == adminLider){
        rfcs.forEach(rfc =>{
            allRFCs[rfc.rfc] = rfc
            $("#rfcSelect").append(
                '<option value = "'+rfc.rfc+'">' + rfc.rfc + '</option>'
            )
        });
    }
    else if(adminUser.profile){
        rfcs.filter( rfc => rfc.administracionAsignada.nombre === adminUser.adminAsig).forEach(rfc =>{
            allRFCs[rfc.rfc] = rfc
            $("#rfcSelect").append(
                '<option value = "'+rfc.rfc+'">' + rfc.rfc + '</option>'
            )
        });
    }
    $('select').formSelect();
    checkRFCSelect()
    showProcedio()
}

function downloadFile(){
    let filename = $(this).text();
    $.ajax({
        type: 'GET',
        url: '/api/archivo?id='+id+'&filename='+filename
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

function showDelete() {
    if (adminUser.profile === 0) {
        $("#borrar-denuncia").show()

    } else {
        $("#borrar-denuncia").hide()
    }
}

function deleteDenuncia() {
    $.ajax({
        type: 'DELETE',
        url: '/api/denuncias/'+id
    }).done(denuncia =>{
        
        window.location.href = "/seguimiento";
        
        
    });
}

load()