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

//Objeto date, lo usaremos para puntuaciones y saber hora de inicio y final
var tiempo = new Date();

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