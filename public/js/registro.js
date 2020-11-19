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

function getAdministraciones(){
    fetch('/api/administraciones')
            .then(response => {
                console.log("Entra 1");
                return response.json()
            })
            .then(data =>{
                console.log("Entra 2");
                let select = document.getElementById("administration");
                select.innerHTML = `<select id="administration">
                <option value="" disabled selected>Escoge una opcion</option>
                </select>`
                data.forEach(element => {
                    let opt = document.createElement('option');
                    opt.value = element._id;
                    opt.innerHTML = element.nombre;
                    select.appendChild(opt);
                });
            }).then( () =>{
                $('select').formSelect();
            });
        selectInit();
}