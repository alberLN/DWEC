var numeroCelulas = 0;
var abierto = false;
var open = false;
var vecino;
var partida;

//Descripciones y titulos de los distintos juegos
var descBasic = "El Dr. Schelling (http://es.wikipedia.org/wiki/Thomas_Schelling) en un intentd'explicar com de fàcil és evitar la segregació i el conflicte entre grups socials va idear un experiment que actualment ha esdevedingut molt conegut."
var tituloInstrucciones = "<span class='tituloDivInfo'>Instrucciones</span>";
var descInstrucciones = "Las fichas con el icono <img src='img/triste.png' style='width:20px; height:20px'> no son felices";
var descInstrucciones2 = "Para hacerlas feliz haz click sobre una de ellas y ellas marcaran las casillas con un color lila, de esta manera sabrás en donde sería feliz";
var descInstrucciones3 = "En el caso de que te bloques o quieras cambiar de juego, haz click en el botón reiniciar para empezar de nuevo";
var game1 = "Las fichas solo seran felices con vecinos del mismo color";
var game2 = "Las fichas solo seran felices con vecinos de diferente color";
var game3 = "Simulador de un cultivo de celulas en una placa de cultivo";
var game3Norma1 = "Nacen nuevas celulas si una celula tiene un minimo de una celula a su alrededor";
var game3Norma2 = "Una celula muere cuando esta rodeada por tres o mas celulas por sobrepoblación";

/*
Nombre: prepararTodo
Parametros:  tipoJuego (int)
Retorna: 
Descripcion: Instancia un objeto de la clase Juego, según el tipo que reciva
*/
function prepararTodo(tipoJuego)
{
	var porCientoAmarilla;
	var porCientoVacia;
	switch(tipoJuego)
	{
		case 1:
			setInfo("Experimento A", game1+"<br><br>"+tituloInstrucciones+"<br><br>"+descInstrucciones+"<br><br>"+descInstrucciones2+"<br><br>"+descInstrucciones3+"<br><br>", true);
			vecino = parseInt($('input[name=group2]:checked').val());
			porCientoAmarilla = parseInt($('#dwl_juego1PorAmarillas').val());
			porCientoVacia = parseInt($('#dwl_juego1PorVacio').val());
			partida = new juego(1, porCientoVacia, porCientoAmarilla);
		break;
		case 2:
			setInfo("Experimento B", game2+"<br><br>"+tituloInstrucciones+"<br><br>"+descInstrucciones+"<br><br>"+descInstrucciones2+"<br><br>"+descInstrucciones3+"<br><br>", true);
			vecino = 1;
			porCientoAmarilla = parseInt($('#dwl_juego2PorAmarillas').val());
			porCientoVacia = parseInt($('#dwl_juego2PorVacio').val());
			partida = new juego(2, porCientoVacia, porCientoAmarilla);
			
		break;
		case 3:
			setInfo("Juego de la vida", game3+"<br><br>"+tituloInstrucciones+"<br><br>"+game3Norma1+"<br><br>"+game3Norma2+"<br><br>", true);
			partida = new juego(3, null, null);
		break;
	}
	StartRestart(false);
	partida.initGame();
	startGame(tipoJuego);
}

/*
Nombre: startGame
Parametros:  tipoJuego (int)
Retorna: 
Descripcion: Inicializa el juego y segun el tipo de juego enseña unos controles u otros
*/
function startGame(tipoJuego)
{
	if(tipoJuego == 3)
	{
		$("#buttonPasarTurno").fadeIn();
		$("#buttonPasarTurno").click(function(){
			partida.tableroJuego.pasarTurno();
		});
	}
}

/*
Nombre: StartRestart
Parametros:  mostrar (Boolean)
Retorna: 
Descripcion: Segun el booleano que recive enseña unos controles u otros*/
function StartRestart(mostrar)
{
	if(mostrar)
	{
		$("#containerDivInfo").slideUp();
		$("#Titulo").fadeIn();
		$("#Menu").fadeIn();
		$("#buttonPasarTurno").fadeOut();
		$("#tablero").empty();
		$("#buttonReiniciar").css("display", "none");
		$("#guardar").css("display", "none");
		setInfo("El petits canvis són poderosos", descBasic+"<br>", false);
	}
	else
	{
		$("#Titulo").fadeOut();
		$("#Menu").fadeOut();
		$("#buttonReiniciar").css("display", "inline");
		$("#guardar").css("display", "inline");
		$("#containerDivInfo").slideDown();
	}
}

/*
Nombre: setInfo
Parametros:  Titulo(String), Desc(String), juego(int)
Retorna: 
Descripcion: Segun los parametros que recibe cambia la información del panel de información*/
function setInfo(Titulo, Desc, juego)
{
	if(juego)
	{
		$("#containerDivInfo").removeClass("contentNormal").addClass("contentGame");
		$("#infoBoton").attr("src", "img/puntoInfoJuego.png");
	}
	else
	{
		$("#containerDivInfo").removeClass("contentGame").addClass("contentNormal");
		$("#infoBoton").attr("src", "img/puntoInfo.png");
	}
	$("#tituloDivInfo").html(Titulo);
	$("#textDivInfo").html(Desc);
}

/*
Nombre: guardar
Parametros: 
Retorna:
Descripcion: Guarada la partida en un fichero .JSON para luego ser cargado
*/

function guardar()
{
	var guardado = new partidaGuardada(partida.tipoJuego, partida.tableroJuego.casillas, partida.fichasAmarillas, partida.fichasAzules, numeroCelulas, vecino, partida.tableroJuego.filas, partida.tableroJuego.colum);
	var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(guardado));
	$("#guardar").attr("href", "data:"+data);
	$("#guardar").attr("download", "data.json");
}

/*
Nombre: cargar
Parametros: partidaGuardada
Retorna:
Descripcion: Carga la partida de un fichero json
*/

function cargar(partidaGuardada)
{
	if(partidaGuardada.hasOwnProperty("tipoJuego"))//comprobamos que sea un objeto correcto con los datos que nos interesa
	{
		$("#tablero").empty();
		numeroCelulas = partidaGuardada.numeroCelulas;
		vecino = partidaGuardada.vecino;
		partida = new juego(partidaGuardada.tipoJuego, null, null);
		completarObjetoJuego(partidaGuardada);
	}
	else
	{
		alert("Archivo json erroneo");
	}
}

/*
Nombre: loadTablero
Parametros: tipoJuego, arrayCasillas
Retorna: tablero
Descripcion: Acaba de cargar la partida e inicializa la misma
*/

function completarObjetoJuego(partidaGuardada)
{
	switch(partidaGuardada.tipoJuego)
	{
		case 1://juego petits cambis normal
			setInfo("Experimento A", game1+"<br><br>"+tituloInstrucciones+"<br><br>"+descInstrucciones+"<br><br>"+descInstrucciones2+"<br><br>"+descInstrucciones3+"<br><br>", true);
			partida.dondeir = dondeirJuego1;
			partida.estadoAnimo = estadoAnimoJuego1;
			partida.getFicha = getDivFicha;
			partida.tableroJuego = new tablero(partidaGuardada.fila, partidaGuardada.columna, partidaGuardada.fichasAmarillas, partidaGuardada.fichasAzules);
			initArrayJuego(partidaGuardada.tablero);
			partida.tableroJuego.pintarTablero();
		break;
		case 2://juego petits cambis solo un vecino diferente
			setInfo("Experimento B", game2+"<br><br>"+tituloInstrucciones+"<br><br>"+descInstrucciones+"<br><br>"+descInstrucciones2+"<br><br>"+descInstrucciones3+"<br><br>", true);
			partida.dondeir = dondeirJuego2;
			partida.estadoAnimo = estadoAnimoJuego2;
			partida.getFicha = getDivFicha;
			partida.tableroJuego = new tablero(partidaGuardada.fila, partidaGuardada.columna, partidaGuardada.fichasAmarillas, partidaGuardada.fichasAzules);
			initArrayJuego(partidaGuardada.tablero);
			partida.tableroJuego.pintarTablero();
		break;
		case 3://juego de la vida con celulas
			setInfo("Juego de la vida", game3+"<br><br>"+tituloInstrucciones+"<br><br>"+game3Norma1+"<br><br>"+game3Norma2+"<br><br>", true);
			partida.dondeir = pasoAlante;
			partida.estadoAnimo = estadoCelula;
			partida.getFicha = imprimirCelula;
			partida.tableroJuego = new tablero(partidaGuardada.fila, partidaGuardada.columna, null, null);
			initArrayVida(partidaGuardada.tablero);
			partida.tableroJuego.setLive();
		break;
	}
	StartRestart(false);
	startGame(partidaGuardada.tipoJuego);
}

/*
	Nombre: initArrayJuego
	Parametros: arrayCasillas
	Retorna: 
	Descripcion: Inicia el array y el tablero para los juegos uno y dos
*/
function initArrayJuego(arrayTablero)
{	
	for(var i = 0; i < arrayTablero.length; i++)
	{
		partida.tableroJuego.casillas[i] = new Array();
		for(var a = 0; a < arrayTablero[i].length; a++)
		{
			var casillaGuardada = arrayTablero[i][a];
			var fichaGuardada = casillaGuardada.ficha;
			partida.tableroJuego.casillas[i][a] = new casilla(casillaGuardada.x, casillaGuardada.y, null, actualizarFicha);
			if(fichaGuardada != null)
				partida.tableroJuego.casillas[i][a].ficha = new ficha(fichaGuardada.tipo, fichaGuardada.estado, fichaGuardada.id,  partida.estadoAnimo, partida.dondeir, partida.getFicha);
		}
	}
}

/*
	Nombre: initArrayVida
	Parametros: arrayCasillas
	Retorna: 
	Descripcion: Inicia el array y el tablero del juego de la vida
*/

function initArrayVida(arrayTablero)
{
	for(var i = 0; i < arrayTablero.length; i++)
	{
		partida.tableroJuego.casillas[i] = new Array();
		for(var a = 0; a < arrayTablero[i].length; a++)
		{
			var casillaGuardada = arrayTablero[i][a];
			var fichaGuardada = casillaGuardada.ficha;
			partida.tableroJuego.casillas[i][a] = new casilla(casillaGuardada.x, casillaGuardada.y, null, actualizarCelula);
			if(fichaGuardada != null)
				partida.tableroJuego.casillas[i][a].ficha = new ficha(fichaGuardada.tipo, fichaGuardada.estado, fichaGuardada.id,  partida.estadoAnimo, partida.dondeir, partida.getFicha);
		}
	}
}

/*
Nombre: handleFileSelect
Parametros:  
Retorna: 
Descripcion: Cargamos el fichero y comprobamos que su extensio sea correcto*/
function loadFile()
{
	$("#fich").click();//asociar evento onchange
	$("#fich").change(function(ev) {
		var archivo = ev.target.files[0];
		if(((archivo.name).split(".").pop()).toLowerCase() == "json")
		{
			var reader = new FileReader();
			reader.onload = (function(evt) {
				if (evt.target.readyState == FileReader.DONE) { // DONE == 2
					var objeto = JSON.parse(evt.target.result);
					console.log(objeto);
					cargar(objeto);
				}
			});
			var blob = archivo.slice(0, archivo.size + 1);
			reader.readAsBinaryString(blob);
		}
		else
		{
			alert("Solo se aceptan archovos .json");
		}
	});
}

/*
Nombre:
Parametros:  
Retorna: 
Descripcion: Segun el evento al hacer click muestra o no el panel de informacion*/
jQuery(document).ready(function(){

	$("#infoBoton").click(function(){
		if(abierto)
		{
			$("#containerDivInfo").slideUp()
			abierto = false;
		}
		else
		{
			
			$("#containerDivInfo").slideDown();
			abierto = true;
		}
	});
	
	$("#menuBoton").click(function(){
		if(open)
		{
			$("#containerDivMenu").slideUp();
			open = false;
		}
		else
		{
			$("#containerDivMenu").slideDown();
			open = true;
		}
	});
});