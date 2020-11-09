function init(){
    selectInit();
    let password = document.querySelector("#password");
    let confPassword = document.querySelector("#confPassword");

    password.addEventListener('focusout', (event) => {
        event.preventDefault();
        if (password.value != confPassword.value) {
            confPassword.classList.remove("valid");
            confPassword.classList.add("invalid");
        } else if (password.value != ""){
            confPassword.classList.remove("invalid")
            confPassword.classList.add("valid");
        }else{
            confPassword.classList.remove("invalid");
            confPassword.classList.remove("valid");
        }
      });

    confPassword.addEventListener("keyup", (event) => {
        event.preventDefault();
        if (password.value != confPassword.value) {
            confPassword.classList.remove("valid");
            confPassword.classList.add("invalid");
        } else if (password.value != ""){
            confPassword.classList.remove("invalid");
            confPassword.classList.add("valid");
        } else{
            confPassword.classList.remove("invalid");
            confPassword.classList.remove("valid");
        }
    })

    // Administraciones
    getAdministraciones();
}

init();

function selectInit(){
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
}

function getAdministraciones() {
    let administraciones = fetch('/api/administraciones').then(data =>{
        console.log(data)
        data.forEach(element => {
            console.log(element.nombre)
            $("#administration").append(
                '<option value = "'+element._id+'">' + element.nombre + '</option>'
            )
        });
    }).then( () =>{
        $('select').formSelect();
    });
}