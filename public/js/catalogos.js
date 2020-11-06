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
            <a class="waves-effect waves-light btn blue">Agregar</a>
        </div>
        <div class="input-field col s7 offset-s1">
            <select>
            <option value="" disabled selected>Escoge una opcion</option>
            <option value="1">Tema 1</option>
            <option value="2">Tema 2</option>
            <option value="3">Option 3</option>
            </select>
            <label>Eliminar tema</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn red">Eliminar</a>
        </div>
        `;
        selectInit();
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
            <a class="waves-effect waves-light btn blue">Agregar</a>
        </div>
        <div class="input-field col s7 offset-s1">
            <select>
            <option value="" disabled selected>Escoge una opcion</option>
            <option value="1">Administración 1</option>
            <option value="2">Administración 2</option>
            <option value="3">Administración 3</option>
            </select>
            <label>Eliminar administración</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn red">Eliminar</a>
        </div>
        `;
        selectInit();
    });
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
            <a class="waves-effect waves-light btn blue">Agregar</a>
        </div>
        <div class="input-field col s7 offset-s1">
            <select>
            <option value="" disabled selected>Escoge una opcion</option>
            <option value="1">Insumo 1</option>
            <option value="2">Insumo 2</option>
            <option value="3">Insumo 3</option>
            </select>
            <label>Eliminar Insumo</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn red">Eliminar</a>
        </div>
        `;
        selectInit();
    });
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
            <a class="waves-effect waves-light btn blue">Agregar</a>
        </div>
        <div class="input-field col s7 offset-s1">
            <select>
            <option value="" disabled selected>Escoge una opcion</option>
            <option value="1">Medio de Recepción 1</option>
            <option value="2">Medio de Recepción 2</option>
            <option value="3">Medio de Recepción 3</option>
            </select>
            <label>Eliminar Medio de Recepción</label>
        </div>
        <div class="input-field col s4">
            <a class="waves-effect waves-light btn red">Eliminar</a>
        </div>
        `;
        selectInit();
    });
}

init();