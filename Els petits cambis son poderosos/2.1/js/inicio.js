var numeroCelulas = 0;
var abierto = false;
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
	partida.initGame();
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
		setInfo("El petits canvis són poderosos", descBasic+"<br>", false);
	}
	else
	{
		$("#Titulo").fadeOut();
		$("#Menu").fadeOut();
		$("#buttonReiniciar").css("display", "inline");
		$("#containerDivInfo").slideDown();
	}
}

/*
Nombre: setInfo
Parametros:  Titulo(String), DescString), juego(int)
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
});