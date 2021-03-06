//Array de palabras
var palabras = new Array();
palabras[0] = "COCHE";
palabras[1] = "PERRO";
palabras[2] = "PEZ";
palabras[3] = "MOTO";
palabras[4] = "SMARTPHONE";
palabras[5] = "SEMAFORO";
palabras[6] = "ESTUCHE";
palabras[7] = "LAMPARA";
palabras[8] = "ANTENA";
palabras[9] = "PERDER";
palabras[10] = "GANAR";

//Donde guardamos el numero aleatorio
var numeroAleatorio = 0;
//Array donde van todas las letras
var letras = new Array();
//Palabra seleccionada para el juego
var palabraJuego;
//Objeto date, lo usaremos para puntuaciones y saber hora de inicio y final
var tiempo = new Date();
//Hora de inicio
var horaInit;
//cronometro
var crono;
//Vidas de una partida
var vidas;
//Segundos
var segundos = 0;
//Minutos
var minutos = 0;
//Horas
var horas = 0;

/*
	Nombre función: insertWord
	entrada:
	salida:
	Descripción: Función que añade una palabra en el array de palabras si ésta no se encuentra repetida
*/
function insertWord()
{
	var yaExiste = false;
	var newWord = document.getElementById("nuevaPalabra").value;
	var mensaje = document.getElementById("mensaje");
	newWord = newWord.toUpperCase();
	if(!newWord == "")//¿hay algo escrito?
	{
		for(index in palabras)//Recorremos el array en busqueda de una palabra repetida
		{
			if(newWord == palabras[index])
			{
				yaExiste = true;
			}
		}
		if(!yaExiste)
		{
			palabras.push(newWord);
			mensaje.style.color = "green";
			mensaje.innerHTML = "La palabra "+newWord+" ha sido insertada.";
		}else{
			mensaje.style.color = "red";
			mensaje.innerHTML = "La palabra "+newWord+" ya está insertada.";
		}
	}
	else
	{
		mensaje.style.color = "red";
		mensaje.innerHTML = "Introduce una palabra";
	}
}

/*
	Nombre función: clear
	entrada:
	salida:
	Descripción: Fúncion que limpia mensajes de error y textbox de la presentación de la aplicación.
*/
function clear()
{
	document.getElementById("nuevaPalabra").value = "";
	document.getElementById("mensaje").innerHTML = "";
}

/*
	Nombre función: initGame
	entrada:
	salida:
	Descripción: Fúncion que inicializa el juego, timers etc.
*/
function initGame()
{
	clear();
	vidas = 3;
	var num = numeroAleatorio;
	while(num == numeroAleatorio && palabras.length > 1)
	{
		numeroAleatorio = Math.floor((Math.random()*palabras.length)+0); //Es necesario el floor puesto que random te devuelve numeros con decimales
	}
	palabraJuego = palabras[numeroAleatorio];
	document.getElementById("ganar").style.display="none";
	document.getElementById("perder").style.display="none";
	document.getElementById("principal").style.display="none";
	document.getElementById("3").style.display="none";
	document.getElementById("2").style.display="none";
	document.getElementById("1").style.display="none";
	document.getElementById("game").style.display="block";
	document.getElementById("resumenPartida").style.display="none";
	horaInit = tiempo.getHours()+":"+tiempo.getMinutes()+":"+tiempo.getSeconds();
	document.getElementById("vidas").innerHTML = vidas;
	document.getElementById("horaInicio").innerHTML = horaInit;
	segundos = minutos = horas = 0;
	inicializarPantalla();
}

/*
	Nombre función: inicializarPantalla
	entrada:
	salida:
	Descripción: Fúncion que va imprimiendo tantos textboxs como letras hayan en la palabra 
	seleccionada aleatoriamente para jugar.
*/
function inicializarPantalla()
{
	var espacios = "";
	cronometro();
	for(var i = 0; i < palabraJuego.length; i++)
	{
		espacios = espacios + "<li><input type='text' class='letra' id='tb"+i+"' maxlength='1'/></li>";
	}
	document.getElementById("letras").innerHTML = espacios;
	for(var i = 0; i < palabraJuego.length; i++)
	{
		letras[i] = document.getElementById("tb"+i);
	}
	crono = setInterval("cronometro()", 1000);
}

/*
	Nombre función: estilizarTiempo
	entrada:
	salida: String
	Descripción: Mira las horas, minutos y segundos y los pasa en una string
	para imitar a un reloj.
*/
function estilizarTiempo()
{
	var h;
	var m;
	var s;
	h = horas < 10 ?  "0"+horas : horas;
	m = minutos < 10 ? "0"+minutos : minutos;
	s = segundos < 10 ? "0"+segundos : segundos;
	return h+":"+m+":"+s;
}

/*
	Nombre función: cronometro
	entrada:
	salida: 
	Descripción: Imprime por pantalla el tiempo empleado en la partida en todo momento
*/
function cronometro()
{
	segundos++;
	if(segundos >= 60)
	{
		segundos = 0;
		minutos++;
		if(minutos >= 60)
		{
			minutos = 0;
			horas++;
		}
	}
	document.getElementById("tiempo").innerHTML = estilizarTiempo();
}

/*
	Nombre función: validarLetra
	entrada:
	salida:
	Descripción: Nos dice si la letra está o no en la palabra, seguidamente llama a otra función que hará
	una cosa u otra dependiendo del resultado de la primera premisa.
*/
function validarLetras()
{
	var correcto = true;
	for(var i = 0; i < palabraJuego.length; i++)
	{
		letras[i].style.backgroundColor = "#FFFFFF";
		letras[i].style.color = "#000000";
		if(letras[i].value != "")//los espacios no cuentan como error
		{
			if((letras[i].value).toUpperCase() == palabraJuego.charAt(i))
			{
				letras[i].value = (letras[i].value).toUpperCase();
				letras[i].disabled = true;
				letras[i].style.backgroundColor = "#468847";
			}
			else
			{
				document.getElementById(vidas).style.display="block";
				letras[i].style.backgroundColor = "#d2322d";
				correcto = false;
			}
			letras[i].style.color = "#FFFFFF";
		}
	}
	finPartida(correcto);
}

/*
	Nombre función: completado
	entrada:
	salida: boolean
	Descripción: recorre toda la cadena mirando si coinciden todos los values de los textbox,
	en caso de que coincidan todos significa que la partida a acabado
*/
function completado()
{
	var correcto = true;
	for(var i = 0; i < palabraJuego.length; i++)
	{
		if(letras[i].value != palabraJuego.charAt(i))
		{
			correcto = false;
		}
	}
	return correcto;
}

/*
	Nombre función: finPartida
	entrada:
	salida: 
	Descripción: Función que nos indica cuando se acaba la partida
*/
function finPartida(correcto)
{
	if(!correcto)
	{
		vidas--;
		document.getElementById("vidas").innerHTML = vidas;
		if(vidas == 0)
		{
			clearInterval(crono);
			showDatos(false);
		}
	}
	else
	{
		if(completado())
		{
			clearInterval(crono);
			showDatos(true);
		}
	}
}

/*
	Nombre función: showDatos
	entrada: boolean
	salida: 
	Descripción: Una vez acabada la partida nos muestra una pantalla con los resultados
*/
function showDatos(ganado)
{
	document.getElementById("game").style.display="none";
	document.getElementById("resumenPartida").style.display="block";
	if(ganado)
	{
		document.getElementById("ganar").style.display="inline";
		document.getElementById("tituloResultado").style.color = "#468847";
		document.getElementById("tituloResultado").innerHTML = "¡¡Felicidades!!, Has ganado";
	}
	else
	{
		document.getElementById("perder").style.display="inline";
		document.getElementById("tituloResultado").style.color = "#d2322d";
		document.getElementById("tituloResultado").innerHTML = "¡¡OOOOOHHHHH!!, Has perdido";
	}
	document.getElementById("tiempoInit").innerHTML = "Hora inicial: "+horaInit;
	document.getElementById("palabraEscondida").innerHTML = "La palabra era... <b>"+palabraJuego+"</b>";
	tiempo = new Date(); //para que se actualice la hora
	document.getElementById("tiempoFin").innerHTML = "Hora Final: "+tiempo.getHours()+":"+tiempo.getMinutes()+":"+tiempo.getSeconds();
	document.getElementById("tiempoInvertido").innerHTML = "Tiempo partida: "+estilizarTiempo();
	document.getElementById("vidasInvertidas").innerHTML = "Vidas utilizadas: " + ( 3 - vidas);
	document.getElementById("total").innerHTML = "Puntos obtenidos: "+media();
}

/*
	Nombre función: media()
	entrada: Number
	salida: 
	Descripción: Retorna una media según el tiempo invertido y vidas utilizadas
*/
function media()
{
	var media = 0;
	var puntoHoras = 0;
	var puntoVidas = 0;
	if(vidas > 0)
	{
		puntoVidas = (vidas * 100); //Cada vida vale 100 puntos
		mediaHoras =  (horas * 1.2) + (minutos * 0.9) + (segundos * 0.5);//Puntos que se han de restar por tiempo
		media = puntoVidas - puntoHoras;
	}
	return media.toFixed(1);//redondeamos decimales
}