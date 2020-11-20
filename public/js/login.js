

function load(){
    $("#loginF").submit(function(e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.
    
        var form = $(this);
        var url = form.attr('action');
        
        $.ajax({
               type: "POST",
               url: url,
               data: form.serialize() // serializes the form's elements.
        }).done(data => {
            console.log(data)
            if(typeof data !== 'object' && data !== null){
                $('#modal2').modal();
                $('#modal2').modal('open');
            }
            else{
                localStorage.setItem("user",    data.userId);
                window.location.href = "/seguimiento";    
            }
        });
    });

}

load()