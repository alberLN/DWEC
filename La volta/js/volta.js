var equipos = new Array();//Array que contiene los dos equipos;
var turno = 0;
var numeroJugadores = 2;
var metrosTotales = 10000;

$(document).ready(function(){
	//alert("hola mundo");
});

/*
	Nombre: initWorld
	Descripción: inicializa todas las variables para empezar la partida y printa las imagenes
	Entrada: -
	Salida: -
*/
function initWorld()
{
	equipos[0] = addEquipo(1, "hola", "r");
	equipos[1] = addEquipo(2, "adios", "a");
	printarJugadores();
}

/*
	Nombre: addEquipo
	Descripción: Inicializa el array de equipo con los corredores, el nombre del equipo y el color escojido
	Entrada: Array del equipo vacía
	Salida: Array del equipo inicializada
*/
function addEquipo(equipo, nombreEquipo, colorEquipo)
{
	var equipo = new Array();
	for(var a = 0; a < 3 + numeroJugadores; a++)
	{
		equipo[0] = nombreEquipo;
		equipo[1] = colorEquipo;
		a = 2;
		for(var i = 0; i < numeroJugadores ; i++)
		{
			if(i > 0)
			{
				//[0]tipo corredor, [1]idCorredor, [2]imagencorredor, [3]metros recorridos, [4]metros que ha de recorrer en el siguiente turno, [5]historial
				equipo[a] = new Array("gregario", "corredor"+i+nombreEquipo, getImgRunner("corredor"+i+nombreEquipo, colorEquipo, "gregario"), 0, 0, new Array());
			}
			else
			{
				equipo[a] = new Array("jefe de filas", "corredor"+i+nombreEquipo, getImgRunner("corredor"+i+nombreEquipo, colorEquipo, "jefe de filas"), 0, 0, new Array());
			}
			a++;
		}
	}
	return equipo;
}

/*
	Nombre: printarJugadores
	Descripción: Imprime por pantalla todos los corredores
	Entrada: --
	Salida: --
*/
function printarJugadores()
{
	for(var a = 0; a < equipos.length; a++)
	{
		for(var i = 2; i < equipos[a].length; i++)
		{
			var div = "<input type='button' data-toggle='modal' data-target='#datosCorredor' value='Historial' onclick='mostrarHistorial("+a+", "+i+")'>";
			$("#circuito").append("<div class='calle'><div class='botonHistorial'>"+div+"</div><div class='corredorCalle'>"+equipos[a][i][2]+"</div><div class='meta'></div></div>");
		}
	}
}

/*
	Nombre: getImgRunner
	Descripción: Retorna la imagen del corredor correspondiente al equipo al que pertenece el mismo
	Entrada: idCorredor, color del equipo, equipo al que pertenece el corredor
	Salida: String que contiene la img para introducir a la web
*/
function getImgRunner(idCorredor, color, claseCorredor)
{
	var img;
	if(claseCorredor == "gregario")
	{
		img = "<img id='"+idCorredor+"' class='imagenCorredores' src='img/1"+color+".png'>";
	}
	else
	{
		img = "<img id='"+idCorredor+"' class='imagenCorredores' src='img/2"+color+".png'>";
	}

	return img;
}

/*
	Nombre: pasarTurno
	Descripción: Avanza la partida y guarda el historial del jugador
	Entrada: -
	Salida: -
*/
function pasarTurno()
{
	var totalMetrosEquipoA = getMetersteam(0);
	var totalMetrosEquipoB = getMetersteam(1);
	if((totalMetrosEquipoA + totalMetrosEquipoB) == 2000)
	{
		for(var a = 0; a < equipos.length; a++)
		{
			for(var i = 2; i < equipos[a].length; i++)
			{
				moveCorredor(i, a);
				equipos[a][i][5][turno] = equipos[a][i][4];
				//equipos[a][i][3] = equipos[a][i][3] + equipos[a][i][4];
			}
		}
		turno++;
	}
	else
	{
		alert("Primero has de introducir los metros que han de recorrer los corredores de cada equipo");
	}
}

function getMetersteam(team)
{
	var total = 0;
	for(var i = 2; i < equipos[team].length; i++)
	{
		total = total + equipos[team][i][4];
	}
	return total;
}

/*
	Nombre: setInfoEquipo
	Descripción: pone la información del equipo en el modal
	Entrada: equipo, posicón del array donde se encuentra el equipo
	Salida: -
*/
function setInfoEquipo(equipo)
{
	$("#modalTituloEquipo").html("Equipo: "+equipos[equipo][0]);
	$("#corredores").empty();
	for(var i = 2; i < equipos[equipo].length; i++)
	{
		$("#corredores").append(equipos[equipo][i][0] + " <input type='text' id='"+i+"' value='"+equipos[equipo][i][4]+"'><br>");
	}

	$("#cambiarMetros").attr("onclick", "cambiarMetros("+equipo+")");
}

/*
	Nombre: cambiarMetros
	Descripción: cambia los metros
	Entrada: equipo, posicón del array donde se encuentra el equipo, idCorredor para encontrar el corredor en el array
	Salida: -
*/
function cambiarMetros(equipo)
{
	//primero comprobamos que el total da 1000
	var sum = 0;
	var correcto = true;
	var idText = 2;
	for(var i = 0; i < numeroJugadores && correcto; i++)
	{
		if(sum + parseInt($("#"+idText).val()) > 0)
		{
			sum = sum + parseInt($("#"+idText).val());
		}
		else
		{
			correcto = false;
		}
		idText++;
	}
	if(correcto)
	{
		if(sum == 1000)
		{
			for(var i = 2; i < equipos[equipo].length; i++)
			{
				equipos[equipo][i][4] = parseInt($("#"+i).val());
			}
		}
		else
		{
			alert("revisa campos"+sum);
		}
	}
	else
	{
		alert("campos vacios");
	}
}

/*
	Nombre: mostrarHistorial
	Descripción: pone el historial de un usuario en el modal
	Entrada: equipo, posicón del array donde se encuentra el equipo, idCorredor para encontrar el corredor en el array
	Salida: -
*/
function mostrarHistorial(equipo, idCorredor)
{
	$("#pNEquipo").html(equipos[equipo][0]);
	$("#historial").empty();
	if(equipos[equipo][idCorredor][5] != "")
	{
		for(var i = 0; i < equipos[equipo][idCorredor][5].length; i++)
		{
			$("#historial").append("<li><b>Turno: </b>"+(i + 1)+"</li>");
			$("#historial").append("<li><b>Metros recorridos: </b>"+equipos[equipo][idCorredor][5][i]+"</li>");
		}
	}
	else
	{
		$("#historial").append("<li><b>No hay datos puesto que no se ha iniciado la partida</b></li>");
	}
}

/*
	Nombre: moveCorredor
	Descripción: Desplaza la imagen del jugador X distancia a la izquierda
	Entrada: id de la imagen que es la misma que la del jugador, left el numero de metros que se ha de despalzar el corredor
	Salida: -
*/
function moveCorredor(posicion, equipo){
	var metrosARecorrer = equipos[equipo][posicion][3] = equipos[equipo][posicion][3] + equipos[equipo][posicion][4];
	var avance =  (metrosARecorrer / metrosTotales) * 100;
	alert(equipos[equipo][posicion][3]);	
	$("#"+equipos[equipo][posicion][1]).css("margin-left", avance+"%");
}