function floatBtnInit(){
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {coverTrigger : false});
}

function init(){
    floatBtnInit();
}

init();