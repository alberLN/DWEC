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

//Array donde van todas las letras puestas
var letras = new Array();

//Palabra seleccionada para el juego
var palabraJuego;

//Objeto date, lo usaremos para puntuaciones y saber hora de inicio y final
var tiempo = new Date();

//Hora de inicio
var horaInit;

//Vidas de una partida
var vidas;

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
	var mensaje = document.getElementById("mensaje"),
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
	var numeroAleatorio = Math.floor((Math.random()*palabras.length)+0); //Es necesario el floor puesto que random te devuelve numeros decimales
	palabraJuego = palabras[numeroAleatorio];
	document.getElementById("principal").style.display="none";
	document.getElementById("game").style.display="block";
	horaInit = tiempo.getDay();
	document.getElementById("vidas").innerHTML = vidas;
	document.getElementById("horaInicio").innerHTML = horaInit;
	inicializarPantalla();
}

function inicializarPantalla()
{
	var espacios = "";
	for(var i = 0; i < palabraJuego.length; i++)
	{
		espacios = espacios + "<li> <input type='text' class='letra' id='tb"+i+"' maxlength='1'/></li>";
	}
	document.getElementById("letras").innerHTML = espacios;
	for(var i = 0; i < palabraJuego.length; i++)
	{
		letras[i] = document.getElementById("tb"+i);
	}
}

/*
	Nombre función: validarLetra
	entrada:
	salida:
	Descripción: Nos dice si la letra está o no en la palabra
*/
function validarLetras()
{
	var correcto = true;
	for(var i = 0; i < palabraJuego.length; i++)
	{
		if(letras[i].value != "")//los espacios no cuentan como error
		{
			if((letras[i].value).toUpperCase() == palabraJuego.charAt(i))
			{
				letras[i].value = (letras[i].value).toUpperCase();
				letras[i].disabled = true;
				letras[i].style.backgroundColor = "#FFFFFF";
			}
			else
			{
				document.getElementById(vidas).style.display="block";
				letras[i].style.backgroundColor = "#FF0000";
				correcto = false;
			}
		}
	}
	if(!correcto)
	{
		vidas--;
		document.getElementById("vidas").innerHTML = vidas;
	}
}