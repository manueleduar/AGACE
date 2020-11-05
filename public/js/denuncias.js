$(document).ready(function() {
    $('select').formSelect();
});

function load (){
    
    let count = 0;
    const addedRFCs = new Set();
    $.ajax({
        type: 'GET',
        url: '/api/temas'
    }).done(data =>{
        console.log(data);
        data.forEach(element => {
            console.log(element.nombre)
            $("#temaS").append(
                '<option value = "'+element._id+'">' + element.nombre + '</option>'
            )
        });
    }).then( () =>{
        $('select').formSelect();
    });

    $('#denunciaBtn').on('click', function(e){
        e.preventDefault();
        let rfcs = [];
        let rfcValidate = true;
        if(!validateForm())
            return 0;
        addedRFCs.forEach(rfc =>{
            if($("#rfc"+rfc).hasClass("invalid")){
                rfcValidate = false;
            }
            else if(!$('#adm'+rfc).val()){
                $('#adm'+rfc).parent().removeClass("valid");
                $('#adm'+rfc).parent().addClass("invalid");
                rfcValidate = false;
            }
            else{
                $('#adm'+rfc).parent().removeClass("invalid");
                $('#adm'+rfc).parent().addClass("valid");
            }
            rfcs.push(
                {
                    rfc: $("#rfc"+rfc).val(),
                    tipo: $("#tipo"+rfc).val(),
                    fecha: new Date(), 
                    administracionAsignada: '', 
                    estatus: '', 
                    idprog: '',
                    causaRechazo: '',
                }
            )
        });

        if(rfcValidate == false)
            return 0;
        var files = $('#archivos')[0].files;
        var form = new FormData();
        var fileNames = []
        for( let i=0; i<files.length; i++){
            console.log(files[i])
            fileNames.push(files[i].name)
            form.append('files[]', files[i]);
        }
      
        let sendData = {
            descripcion: $('#desc').val(),
            tema: $('#temaS').val(),
            adminstracionLider: $('#adm').val(),
            origen: $('#orig').val(),
            medioRecepcion: $('#medio').val(),
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
            console.log(data); 
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
                console.log("Archivo uploaded")
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
                '<option value="" disabled selected>Elige el Administrador Asignado</option>'+
                '<option value="1">Option 1</option>'+
                ' <option value="2">Option 2</option>'+
                '<option value="3">Option 3</option>'+
                '</select>'+
                '<label>Administracion Asignado</label>'+
           ' </div>'+
            '<div class="input-field col s3 rfcss">'+
            '<input  id="rfc'+count+'" type="text" class="validate rfcInp" maxlength = "13" >'+
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
        $('select').formSelect();
        $('.rfcss > input').characterCounter();

    });

    $("#rfcs").on("click", ".removeRFC", function(){
        let id = $(this).attr('id');
        id = id.slice(1);
        remove(id);
        addedRFCs.delete(Number(id));
        console.log(addedRFCs)
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

    if(!$('#temaS').val()){
        $('#temaS').parent().removeClass("valid");
        $('#temaS').parent().addClass("invalid");
        return false;
    }
    $('#temaS').parent().removeClass("invalid");
    $('#temaS').parent().addClass("valid");

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

load();

