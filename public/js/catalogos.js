function dropdownInit(){
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {coverTrigger : false});
}

function selectInit(){
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
}

function init(){
    dropdownInit();
    //selectInit();
    temasForm();
    administracionesForm();
    insumosForm();
    mediosForm();
}


function temasForm(){
    let catalogoContainer = document.querySelector("#catalogoContainer");
    let catalogoTema = document.querySelector("#catalogoTema");
    catalogoTema.addEventListener("click", (event) => {
        event.preventDefault();
        catalogoContainer.innerHTML = 
        `
        <div class="input-field col s7 offset-s1">
            <input id="addTema" type="text" class="validate">
            <label for="addTema">Agregar tema</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn blue" onclick="addTema()">Agregar</a>
        </div>
        <div class="input-field col s7 offset-s1">
            <select id="temaSelect">
            <option value="" disabled selected>Escoge una opcion</option>
            </select>
            <label>Eliminar tema</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn red">Eliminar</a>
        </div>
        `;
        
        selectInit();
        fetch('/api/temas')
            .then(response => {
                return response.json()
            })
            .then(data =>{
                let select = document.getElementById("temaSelect");
                data.forEach(element => {
                    let opt = document.createElement('option');
                    opt.value = element._id;
                    opt.innerHTML = element.nombre;
                    select.appendChild(opt);
                });
            }).then( () =>{
                $('select').formSelect();
            });
    });
}

function administracionesForm(){
    let catalogoContainer = document.querySelector("#catalogoContainer");
    let catalogoAdministracion = document.querySelector("#catalogoAdministracion");
    catalogoAdministracion.addEventListener("click", (event) => {
        event.preventDefault();
        catalogoContainer.innerHTML = 
        `
        <div class="input-field col s7 offset-s1">
            <input id="addAdmin" type="text" class="validate">
            <label for="addAdmin">Agregar administración</label>
        </div>
        <div class="input-field col s4">
            <a id="adminBtn" class="waves-effect waves-light btn blue" onclick="addAdmin()">Agregar</a>
        </div>
        <div class="input-field col s7 offset-s1">
            <select id="administration">
            <option value="" disabled selected>Escoge una opcion</option>
            </select>
            <label>Eliminar administración</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn red">Eliminar</a>
        </div>
        `;
        fetch('/api/administraciones')
            .then(response => {
                return response.json()
            })
            .then(data =>{
                let select = document.getElementById("administration");
                data.forEach(element => {
                    let opt = document.createElement('option');
                    opt.value = element._id;
                    opt.innerHTML = element.nombre;
                    select.appendChild(opt);
                });
            }).then( () =>{
                $('select').formSelect();
            });
        });
        selectInit();

}

function insumosForm(){
    let catalogoContainer = document.querySelector("#catalogoContainer");
    let catalogoInsumo = document.querySelector("#catalogoInsumo");
    catalogoInsumo.addEventListener("click", (event) => {
        event.preventDefault();
        catalogoContainer.innerHTML = 
        `
        <div class="input-field col s7 offset-s1">
            <input id="addInsumo" type="text" class="validate">
            <label for="addInsumo">Agregar Insumo</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn blue" onclick="addInsumo()">Agregar</a>
        </div>
        <div class="input-field col s7 offset-s1">
            <select id="insumoSelect">
            <option value="" disabled selected>Escoge una opcion</option>
            </select>
            <label>Eliminar Insumo</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn red">Eliminar</a>
        </div>
        `;
        fetch('/api/insumos')
            .then(response => {
                return response.json()
            })
            .then(data =>{
                let select = document.getElementById("insumoSelect");
                data.forEach(element => {
                    let opt = document.createElement('option');
                    opt.value = element._id;
                    opt.innerHTML = element.nombre;
                    select.appendChild(opt);
                });
            }).then( () =>{
                $('select').formSelect();
            });
        });
        selectInit();
}

function mediosForm(){
    let catalogoContainer = document.querySelector("#catalogoContainer");
    let catalogoMedios = document.querySelector("#catalogoMedios");
    catalogoMedios.addEventListener("click", (event) => {
        event.preventDefault();
        catalogoContainer.innerHTML = 
        `
        <div class="input-field col s7 offset-s1">
            <input id="addMedio" type="text" class="validate">
            <label for="addMedio">Agregar Medio de Recepción</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn blue" onclick="addMediosRecepcion()">Agregar</a>
        </div>
        <div class="input-field col s7 offset-s1">
            <select id="medioSelect">
            <option value="" disabled selected>Escoge una opcion</option>
            </select>
            <label>Eliminar Medio de Recepción</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn red">Eliminar</a>
        </div>
        `;
        fetch('/api/medios_recepcion')
            .then(response => {
                return response.json()
            })
            .then(data =>{
                let select = document.getElementById("medioSelect");
                data.forEach(element => {
                    let opt = document.createElement('option');
                    opt.value = element._id;
                    opt.innerHTML = element.nombre;
                    select.appendChild(opt);
                });
            }).then( () =>{
                $('select').formSelect();
            });
        });
        selectInit();
}

init();

function addAdmin() {

    let admin = document.getElementById('addAdmin').value;

    fetch('/api/administraciones', {
        method: 'POST',
        body: JSON.stringify({"data": admin}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok)
            return response.json()
    })
    .then(element =>{
        if (element) {
            let select = document.getElementById("administration");
            let opt = document.createElement('option');
            opt.value = element._id;
            opt.innerHTML = element.nombre;
            select.appendChild(opt);
            document.getElementById('addAdmin').value = "";
        }
    })
    .then( () =>{
        $('select').formSelect();
    });
}

function addTema() {

    let tema = document.getElementById('addTema').value;

    fetch('/api/temas', {
        method: 'POST',
        body: JSON.stringify({"data": tema}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok)
            return response.json()
    })
    .then(element =>{
        if (element) {
            let select = document.getElementById("temaSelect");
            let opt = document.createElement('option');
            opt.value = element._id;
            opt.innerHTML = element.nombre;
            select.appendChild(opt);
            document.getElementById('addTema').value = "";
        }
    })
    .then( () =>{
        $('select').formSelect();
    });
}

function addInsumo() {

    let insumo = document.getElementById('addInsumo').value;

    fetch('/api/insumos', {
        method: 'POST',
        body: JSON.stringify({"data": insumo}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok)
            return response.json()
    })
    .then(element =>{
        if (element) {
            let select = document.getElementById("insumoSelect");
            let opt = document.createElement('option');
            opt.value = element._id;
            opt.innerHTML = element.nombre;
            select.appendChild(opt);
            document.getElementById('addInsumo').value = "";
        }
    })
    .then( () =>{
        $('select').formSelect();
    });
}

function addMediosRecepcion() {
    let medioRecepcion = document.getElementById('addMedio').value;

    fetch('/api/medios_recepcion', {
        method: 'POST',
        body: JSON.stringify({"data": medioRecepcion}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok)
            return response.json()
    })
    .then(element =>{
        if (element) {
            let select = document.getElementById("medioSelect");
            let opt = document.createElement('option');
            opt.value = element._id;
            opt.innerHTML = element.nombre;
            select.appendChild(opt);
            document.getElementById('addMedio').value = "";
        }
    })
    .then( () =>{
        $('select').formSelect();
    });
}