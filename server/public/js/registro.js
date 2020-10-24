function init(){
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
}

init();