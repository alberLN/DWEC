/*
	Nombre archivo: volta.js
	Descripción: Todas las funciones para que funcione la simulación
*/

var equipos = new Array();//Array que contiene los dos equipos;
var nombrePartida = "";
var turno = 0;
var numeroJugadores = 0;
var metrosTotales = 0;

/*
	Nombre: comprobarDatos
	Descripción: Comprobamos que todos los datos introducidos sobre la partida sean correctos
	Entrada: --
	Salida: --
*/
function comprobarPartida()
{
	$("#erroresNewGame").css("display", "none");
	if($("#partidaName").val() == "")
	{
		errors("Introduce un nombre a la partida.");
	}
	else
	{
		if($("#metrosCarrera").val() == "")
		{
			errors("Introduce los metros de distancia.");
		}
		else if($("#metrosCarrera").val() < 5000)
		{
			errors("Los metros de la carrera han de ser superior a 5000");
		}else if($("#metrosCarrera").val() == "")
		{
			errors("Introduce el numero de jugadores.");
		}else if($("#nCorredores").val() == "")
		{
			errors("Introduce el número de corredores");
		}else if($("#nCorredores").val() < 3 || $("#nCorredores").val() > 8)
		{
			errors("Solo pueden haber entre tres u ocho corredores a la vez");
		}
		else
		{
			comprobarEquipos();
		}
	}
}

/*
	Nombre: comprobarEquipos
	Descripción: Comprobamos que todos los datos introducidos sobre los equipos sean correctos y procedemos a inicializar la partida
	Entrada: --
	Salida: --
*/
function comprobarEquipos()
{
	if($("#nombreEquipo1").val() == "")
	{
		errors("Introduce el nombre del Equipo 1.");
	}else if($("#nombreEquipo2").val() == "")
	{
		errors("Introduce el nombre del Equipo 2.");
	}else if($("input[name='colorEquip1']:checked").val() == $("input[name='colorEquip2']:checked").val()){
		errors("El color de los equipos no ha de coincidir.");
	}
	else
	{
		$("#nuevaPartida").css("display", "none");
		$(".modal-backdrop").css("display", "none");
		initWorld();
		$("#inicio").css("display", "none");
		$("#juego").css("display", "block");
	}
}

/*
	Nombre: errors()
	Descripción: Muestra errores en caso de que se hayan introducido un dato correcto a la hora de crear una partida
	Entrada: mensaje, String con el mensaje a mostrar
	Salida: --
*/
function errors(mensaje)
{
	$("#erroresNewGame").css("display", "block");
	$("#erroresNewGame").html(mensaje);
}
/*
	Nombre: initWorld
	Descripción: inicializa todas las variables para empezar la partida y printa las imagenes
	Entrada: --
	Salida: --
*/
function initWorld()
{
	nombrePartida = $("#partidaName").val();
	metrosTotales = $("#metrosCarrera").val();
	numeroJugadores = $("#nCorredores").val();
	equipos[0] = addEquipo($("#nombreEquipo1").val(), $("input[name='colorEquip1']:checked").val());
	equipos[1] = addEquipo($("#nombreEquipo2").val(), $("input[name='colorEquip2']:checked").val());
	$("#equipoA").val("Equipo: "+equipos[0][0]);
    $("#equipoB").val("Equipo: "+equipos[1][0]);
	printarJugadores();
}

/*
	Nombre: addEquipo
	Descripción: Inicializa el array de equipo con los corredores, el nombre del equipo y el color escojido
	Entrada: Array del equipo vacía
	Salida: Array del equipo inicializada
*/
function addEquipo(nombreEquipo, colorEquipo)
{
	var equipo = new Array();

	equipo[0] = nombreEquipo;
	equipo[1] = colorEquipo;
	equipo[2] = new Array();

	for(var i = 0; i < numeroJugadores ; i++)
	{
		if(i > 0)
		{
			//[0]tipo corredor, [1]idCorredor, [2]imagencorredor, [3]metros recorridos, [4]metros que ha de recorrer en el siguiente turno, [5]historial
			equipo[2][i] = new Array("gregario", "corredor"+i+nombreEquipo, getImgRunner("corredor"+i+nombreEquipo, colorEquipo, "gregario"), 0, 0, new Array());
		}
		else
		{
			equipo[2][i] = new Array("jefe de filas", "corredor"+i+nombreEquipo, getImgRunner("corredor"+i+nombreEquipo, colorEquipo, "jefe de filas"), 0, 0, new Array());
		}
	}

	return equipo;
}

/*
	Nombre: printarJugadores
	Descripción: Imprime por pantalla todos los corredores botones y características
	Entrada: --
	Salida: --
*/
function printarJugadores()
{
	for(var a = 0; a < equipos.length; a++)
	{
		for(var i = 0; i < equipos[a][2].length; i++)
		{
			var boton = "<input type='button' class='btn btn-info botonHistorial' data-toggle='modal' data-target='#datosCorredor' value='Historial' onclick='mostrarHistorial("+a+", "+i+")'>";
			var ciclista = "<div class='col-md-10 column calle'>"+equipos[a][2][i][2]+"</div>";
			$("#circuito").append("<div class='row clearfix'><div class='cold-md-1 column'>"+boton+"</div><div class='cold-md-1 column'></div>"+ciclista+"</div>");
			var avance =  (equipos[a][2][i][3] / metrosTotales) * 100;
			$("#"+equipos[a][2][i][1]).css("margin-left", avance+"%");
		}
	}
}

/*
	Nombre: getImgRunner
	Descripción: Retorna la imagen del corredor correspondiente al equipo al que pertenece el mismo
	Entrada: idCorredor, color del equipo, equipo al que pertenece el corredor
	Salida: String que contiene la img para introducir a la web
*/
function getImgRunner(idCorredor, color, claseCorredor)//metros recorridos
{
	var img;
	if(claseCorredor == "gregario")
	{
		img = "<img id='"+idCorredor+"' class='imagenCorredores' style='margin-left: 0' src='img/1"+color+".png'>";
	}
	else
	{
		img = "<img id='"+idCorredor+"' class='imagenCorredores' style='margin-left: 0' src='img/2"+color+".png'>";
	}

	return img;
}

/*
	Nombre: pasarTurno
	Descripción: Avanza la partida y guarda el historial del jugador
	Entrada: --
	Salida: --
*/
function pasarTurno()
{
	var totalMetrosEquipoA = getMetersteam(0);
	var totalMetrosEquipoB = getMetersteam(1);
	if((totalMetrosEquipoA + totalMetrosEquipoB) == 2000)
	{
		for(var a = 0; a < equipos.length; a++)
		{
			for(var i = 0; i < equipos[a][2].length; i++)
			{
				moveCorredor(i, a);
				equipos[a][2][i][5][turno] = equipos[a][2][i][4];
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
	for(var i = 0; i < equipos[team][2].length; i++)
	{
		total = total + equipos[team][2][i][4];
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
	for(var i = 0; i < equipos[equipo][2].length; i++)
	{
		$("#corredores").append("<label>"+equipos[equipo][2][i][0]+"</label>" + "<div class='form-group'><input type='text' id='"+i+"' value='"+equipos[equipo][2][i][4]+"'></div>");
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
		if(sum + parseInt($("#"+i).val()) > 0)
		{
			sum = sum + parseInt($("#"+i).val());
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
			for(var i = 0; i < equipos[equipo][2].length; i++)
			{
				equipos[equipo][2][i][4] = parseInt($("#"+i).val());
			}
		}
		else
		{
			alert("revisa campos");
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
	$("#pMRecord").html(equipos[equipo][2][idCorredor][3]);
	$("#historial").empty();
	if(equipos[equipo][2][idCorredor][5] != "")
	{
		for(var i = 0; i < equipos[equipo][2][idCorredor][5].length; i++)
		{
			$("#historial").append("<li><b>Turno: </b>"+(i + 1)+"</li>");
			$("#historial").append("<li><b>Metros en el turno recorridos: </b>"+equipos[equipo][2][idCorredor][5][i]+"</li>");
		}
	}
	else
	{
		$("#historial").append("<li><b>No hay datos puesto que no se ha iniciado la partida</b></li>");
	}
}

/*
	Nombre: moveCorredor
	Descripción: Desplaza la imagen del jugador X distancia a la izquierda y comprobando si ha llegado al final
	Entrada: id de la imagen que es la misma que la del jugador, left el numero de metros que se ha de despalzar el corredor
	Salida: -
*/
function moveCorredor(posicion, equipo){
	var metrosARecorrer = equipos[equipo][2][posicion][3] + equipos[equipo][2][posicion][4];
	var avance =  (metrosARecorrer / metrosTotales) * 100;
	if(metrosARecorrer - metrosTotales <= 0)
	{
		$("#"+equipos[equipo][2][posicion][1]).css("margin-left", avance+"%");
		equipos[equipo][2][posicion][3] = metrosARecorrer;

	}
	else
	{
		$("#"+equipos[equipo][2][posicion][1]).css("margin-left", 100+"%");
		equipos[equipo][2][posicion][3] = metrosTotales;
	}
	
}