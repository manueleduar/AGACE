function dropdownInit(){
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {coverTrigger : false});
}

function selectInit(){
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
}

function sideNavInit(){
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
}

function init(){
    dropdownInit();
    //sideNavInit();
    temasForm();
    administracionesForm();
    insumosForm();
    mediosForm();
    statusForm();
    causaRechazoForm();
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
            <a class="waves-effect waves-light btn red" onclick="deleteTema()">Eliminar</a>
        </div>
        `;
        getTemas();
    });
}

function getTemas(){
    fetch('/api/temas')
         .then(response => {
                return response.json()
            })
            .then(data =>{
                let select = document.getElementById("temaSelect");
                select.innerHTML = `
                <select id="temaSelect">
                 <option value="" disabled selected>Escoge una opcion</option>
                </select>
                `
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
            <a class="waves-effect waves-light btn red" onclick="deleteAdministracion()">Eliminar</a>
        </div>
        `;
        getAdministraciones();
    });
}

function getAdministraciones(){
    fetch('/api/administraciones')
            .then(response => {
                return response.json()
            })
            .then(data =>{
                let select = document.getElementById("administration");
                select.innerHTML = `<select id="administration">
                <option value="" disabled selected>Escoge una opcion</option>
                </select>`
                data.forEach(element => {
                    let opt = document.createElement('option');
                    opt.value = element._id;
                    opt.innerHTML= element.nombre;
                    select.appendChild(opt);
                });
            }).then( () =>{
                $('select').formSelect();
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
            <label for="addInsumo">Agregar insumo</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn blue" onclick="addInsumo()">Agregar</a>
        </div>
        <div class="input-field col s7 offset-s1">
            <select id="insumoSelect">
            <option value="" disabled selected>Escoge una opcion</option>
            </select>
            <label>Eliminar insumo</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn red" onclick="deleteInsumo()">Eliminar</a>
        </div>
        `;
        getInsumos();
    });
}

function getInsumos(){
    fetch('/api/insumos')
    .then(response => {
        return response.json()
    })
    .then(data =>{
        let select = document.getElementById("insumoSelect");
        select.innerHTML = `<select id="insumoSelect">
        <option value="" disabled selected>Escoge una opcion</option>
        </select>`;
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

function mediosForm(){
    let catalogoContainer = document.querySelector("#catalogoContainer");
    let catalogoMedios = document.querySelector("#catalogoMedios");
    catalogoMedios.addEventListener("click", (event) => {
        event.preventDefault();
        catalogoContainer.innerHTML = 
        `
        <div class="input-field col s7 offset-s1">
            <input id="addMedio" type="text" class="validate">
            <label for="addMedio">Agregar medio de recepción</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn blue" onclick="addMediosRecepcion()">Agregar</a>
        </div>
        <div class="input-field col s7 offset-s1">
            <select id="medioSelect">
            <option value="" disabled selected>Escoge una opcion</option>
            </select>
            <label>Eliminar medio de recepción</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn red" onclick="deleteMedio()">Eliminar</a>
        </div>
        `;
        getMedios();
    });
}

function getMedios(){
    fetch('/api/medios_recepcion')
            .then(response => {
                return response.json()
            })
            .then(data =>{
                let select = document.getElementById("medioSelect");
                select.innerHTML = `<select id="medioSelect">
                <option value="" disabled selected>Escoge una opcion</option>
                </select>
                `
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

function statusForm(){
    let catalogoContainer = document.querySelector("#catalogoContainer");
    let catalogoStatus = document.querySelector("#catalogoStatus");
    catalogoStatus.addEventListener("click", (event) => {
        event.preventDefault();
        catalogoContainer.innerHTML = 
        `
        <div class="input-field col s7 offset-s1">
            <input id="addStatus" type="text" class="validate">
            <label for="addStatus">Agregar estatus</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn blue" onclick="addStatus()">Agregar</a>
        </div>
        <div class="input-field col s7 offset-s1">
            <select id="statusSelect">
            <option value="" disabled selected>Escoge una opcion</option>
            </select>
            <label>Eliminar estatus</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn red" onclick="deleteStatus()">Eliminar</a>
        </div>
        `;
        getStatus();
    });
}

function getStatus(){
    fetch('/api/status')
         .then(response => {
                return response.json()
            })
            .then(data =>{
                let select = document.getElementById("statusSelect");
                select.innerHTML = `
                <select id="statusSelect">
                 <option value="" disabled selected>Escoge una opcion</option>
                </select>
                `
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

function causaRechazoForm(){
    let catalogoContainer = document.querySelector("#catalogoContainer");
    let catalogoCausas = document.querySelector("#catalogoCausas");
    catalogoCausas.addEventListener("click", (event) => {
        event.preventDefault();
        catalogoContainer.innerHTML = 
        `
        <div class="input-field col s7 offset-s1">
            <input id="addCausa" type="text" class="validate">
            <label for="addCausa">Agregar causa de rechazo</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn blue" onclick="addCausa()">Agregar</a>
        </div>
        <div class="input-field col s7 offset-s1">
            <select id="causaSelect">
            <option value="" disabled selected>Escoge una opcion</option>
            </select>
            <label>Eliminar causa de rechazo</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn red" onclick="deleteCausa()">Eliminar</a>
        </div>
        `;
        getCausasRechazo();
    });
}

function getCausasRechazo(){
    fetch('/api/causasRechazo')
         .then(response => {
                return response.json()
            })
            .then(data =>{
                let select = document.getElementById("causaSelect");
                select.innerHTML = `
                <select id="causaSelect">
                 <option value="" disabled selected>Escoge una opcion</option>
                </select>
                `
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

function addStatus() {

    let status = document.getElementById('addStatus').value;

    fetch('/api/status', {
        method: 'POST',
        body: JSON.stringify({"data": status}),
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
            let select = document.getElementById("statusSelect");
            let opt = document.createElement('option');
            opt.value = element._id;
            opt.innerHTML = element.nombre;
            select.appendChild(opt);
            document.getElementById('addStatus').value = "";
        }
    })
    .then( () =>{
        $('select').formSelect();
    });
}

function addCausa() {
    let causaRechazo = document.getElementById('addCausa').value;

    fetch('/api/causasRechazo', {
        method: 'POST',
        body: JSON.stringify({"data": causaRechazo}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok)
            return response.json()
    })
    .then(element =>{
        if (element) {
            let select = document.getElementById("causaSelect");
            let opt = document.createElement('option');
            opt.value = element._id;
            opt.innerHTML = element.nombre;
            select.appendChild(opt);
            document.getElementById('addCausa').value = "";
        }
    })
    .then( () =>{
        $('select').formSelect();
    });

}

function deleteInsumo() {
    let insumoField = document.getElementById("insumoSelect");
    let insumoValue = insumoField.options[insumoField.selectedIndex].value;
    fetch('/api/insumos/deleteOne', {
        method: 'PATCH',
        body: JSON.stringify({"data": insumoValue}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok){
            getInsumos();
            return response.json();
        }
            
    })
}

function deleteAdministracion() {
    let administracionField = document.getElementById("administration");
    let administracionValue = administracionField.options[administracionField.selectedIndex].value;
    fetch('/api/administraciones/deleteOne', {
        method: 'PATCH',
        body: JSON.stringify({"data": administracionValue}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok){
            getAdministraciones();
            return response.json();
        }
            
    })
}

function deleteTema() {
    let temaField = document.getElementById("temaSelect");
    let temaValue = temaField.options[temaField.selectedIndex].value;
    fetch('/api/temas/deleteOne', {
        method: 'PATCH',
        body: JSON.stringify({"data": temaValue}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok){
            getTemas();
            return response.json();
        }
            
    })
}

function deleteMedio() {
    let medioField = document.getElementById("medioSelect");
    console.log(medioField.options[medioField.selectedIndex])
    let medioValue = medioField.options[medioField.selectedIndex].value;
    fetch('/api/medios_recepcion/deleteOne', {
        method: 'PATCH',
        body: JSON.stringify({"data": medioValue}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok){
            getMedios();
            return response.json();
        }
            
    })
}

function deleteStatus() {
    let statusField = document.getElementById("statusSelect");
    let statusValue = statusField.options[statusField.selectedIndex].value;
    fetch('/api/status/deleteOne', {
        method: 'PATCH',
        body: JSON.stringify({"data": statusValue}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok){
            getStatus();
            return response.json();
        }
            
    })
}

function deleteCausa() {
    let causaField = document.getElementById("causaSelect");
    let causaValue = causaField.options[causaField.selectedIndex].value;
    fetch('/api/causasRechazo/deleteOne', {
        method: 'PATCH',
        body: JSON.stringify({"data": causaValue}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok){
            getCausasRechazo();
            return response.json();
        }
            
    })
}