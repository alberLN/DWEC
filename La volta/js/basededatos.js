/*
    Nombre archivo: basededatos.js
    Descripción: Todas las funciones relacionadas con la administración de la base ded atos y sus registros
*/

var idbSupported = false;
var db;
var nuevaPartida = true;

if("indexedDB" in window) {
        idbSupported = true;
 }

//Establecer conexión cone l servidor
document.addEventListener("DOMContentLoaded", function(){
    
    //Comprobar que nuestro navegador tiene soporte con indexddb
    if(idbSupported) 
    {
        var openRequest = indexedDB.open("guardado", 4);

        openRequest.onupgradeneeded = function(e) 
        {
            var thisDB = e.target.result;
            
            /* crear objeto si existe*/
            if(!thisDB.objectStoreNames.contains("guardado")) {
                var datosGuardados = thisDB.createObjectStore("guardado",{autoIncrement: true});
                datosGuardados.createIndex("name", "name", {unique:true});
            }

        }
        
        //En el caso de que se haya contectado de forma correcta
        openRequest.onsuccess = function(e) 
        {
            console.log("Conetcatdo");
            db = e.target.result;
        }
    
    	//Error al cargar la base de datos
        openRequest.onerror = function(e) 
        {
            console.log("Error");
            console.dir(e);
        }
        
    }
},false);

/*
    Nombre: createState
    Descripción: Para crear una nueva partida y alojarla en indexeddb
    Entrada: --
    Salida: --
*/
function createState()
{
    var transaction = db.transaction(["guardado"],"readwrite");
    var store = transaction.objectStore("guardado");

    //Define el objeto a crear
    var request = store.add({
                name: nombrePartida,
                equipo: equipos,
                turnos: turno,
                nJugadores: numeroJugadores,
                mTotales: metrosTotales});
    
    request.onerror = function(e) 
    {
        console.log("Error",e.target.error.name);
    }

    request.onsuccess = function(e)
    {
        console.log("Usuario creado");
    }
}

/*
    Nombre: createState
    Descripción: Guarda el estado de una partida ya creada
    Entrada: --
    Salida: --
*/
function saveState()
{
    var coincidencia = false;
    var transaction = db.transaction(["guardado"],"readwrite");
    var store = transaction.objectStore("guardado");

    store.openCursor().onsuccess = function(event)
    {
        var cursor = event.target.result;
        if(cursor && !coincidencia)
        {
            if(cursor.value.name == nombrePartida)
            {
                coincidencia = true;
                cursor.value.turnos = turno;
                cursor.value.equipo = equipos;
                cursor.update(cursor.value);
            }
            cursor.continue();
        }

        if(!coincidencia)
        {
            createState();
        }
    }
}

/*
    Nombre: loadAllState
    Descripción: Nos devuelve todas las partidas que tenemos guardadas para después ser cargadas
    Entrada: --
    Salida: --
*/
function loadAllState()
{
    var transaction = db.transaction(["guardado"],"readwrite");
    var store = transaction.objectStore("guardado");
    $("#partidasGuardadas").empty();
    store.openCursor().onsuccess = function(event)
    {
        var cursor = event.target.result;
        if(cursor)
        {   
            var botonCargar = "<input type='button' class='btn btn-link' onclick="+'"'+"loadState('"+cursor.value.name+"')"+'"'+"value='"+cursor.value.name+"'>";
            $("#partidasGuardadas").append("<li>"+botonCargar+"</li>");
            cursor.continue();
        }
    }
}

/*
    Nombre: loadState
    Descripción: Carga una partida en concreto
    Entrada: --
    Salida: --
*/
function loadState(idPartida)
{
    var salir = false;
    var transaction = db.transaction(["guardado"],"readwrite");
    var store = transaction.objectStore("guardado");

    store.openCursor().onsuccess = function(event)
    {
        var cursor = event.target.result;
        if(cursor && !salir)
        {

            if(cursor.value.name == idPartida)
            {
                $("#cargarPartida").css("display", "none");
                $(".modal-backdrop").css("display", "none");
                salir = true;
                equipos = cursor.value.equipo;
                nombrePartida = cursor.value.name;
                turno = cursor.value.turnos;
                numeroJugadores = cursor.value.nJugadores;
                metrosTotales = cursor.value.mTotales;
                $("#equipoA").val("Equipo: "+equipos[0][0]);
                $("#equipoB").val("Equipo: "+equipos[1][0]);
                $("#inicio").css("display", "none");
                $("#juego").css("display", "block");
                printarJugadores();
            }
            cursor.continue();
        }
    }
}