
/*
Nombre: actualizarFicha
Parametros:
Retorna: 
Descripcion: se printa en la celda una ficha segun el estado de la misma
*/
function actualizarFicha()
{
	$("#"+this.id).removeClass("casillaPosible");
	if(this.ficha != null)
	{
		this.ficha.estado = this.ficha.estadoAnimo();
		$("#"+this.id).html(this.ficha.getFicha());
		if(!(this.ficha.estado))
			this.ficha.drop();
	}
	else
	{
		$("#"+this.id).empty();
	}
}
/*
Nombre: getDivFicha
Parametros:
Retorna: 
Descripcion: retorna un div de la ficha y actualiza el estado de la ficha
*/
function getDivFicha()
{
	this.estado = this.estadoAnimo();
	if(this.estado)
	{
		return "<div id='"+this.id+"' class='ficha "+this.tipo+"'></div>";
	}
	else
	{
		return "<div id='"+this.id+"' class='ficha "+this.tipo+" fichaTriste'></div>";
	}
}

/*
Nombre: actualizarCelula
Parametros:
Retorna: 
Descripcion: actualiza y retorna la ficha
*/
function actualizarCelula()
{
	$("#"+this.id).empty();
	if(this.ficha != null)
	{
		$("#"+this.id).html(this.ficha.getFicha());
	}
}

//Funciones juego 1
/*
Nombre: estadoAnimoJuego1
Parametros: tipo(String), x(int), y(int)
Retorna: Boolean
Descripcion: Nos retorna un true si la ficha es feliz en X posicion o falso en el caso contrario
*/
function estadoAnimoJuego1(tipo, x, y)
{
	var casilla = partida.tableroJuego.getCasillaByIdFicha(this.id);
	return getPosible(casilla.x, casilla.y, this.tipo, partida.tableroJuego.casillas[casilla.x][casilla.y].ficha) >= vecino;
}

/*
Nombre: dondeirJuego1
Parametros: tipo(String), x(int), y(int)
Retorna:
Descripcion: Funcion que cambia el fondo de las celdas segun si la ficha se siente agusto o no
*/
function dondeirJuego1(tipo, x, y)
{
	for(var i = 0; i < partida.tableroJuego.filas; i++)
	{
		for(var a = 0; a < partida.tableroJuego.colum; a++)
		{
			if(partida.tableroJuego.casillas[i][a].ficha == null)
			{
				if(getPosible(i, a, tipo, partida.tableroJuego.casillas[x][y].ficha) >= vecino)
				{
					$("#"+partida.tableroJuego.casillas[i][a].id).addClass("casillaPosible");
				}
			}
		}
	}
}

/*
Nombre: getPosible
Parametros: i(int), a(int), tipo(String), x(int), y(int), fichaActual(class Ficha)
Retorna: Int
Descripcion: Retorna el numero de coincidencia según las preferencias de la ficha
*/
function getPosible(i, a, tipo, fichaActual)
{
	var x = i;
	var y = a;
	var contador = 0;
	if(rangoCorrecto(x, (y - 1)))//arriba
	{
		if(partida.tableroJuego.casillas[x][y - 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x][y - 1].ficha.tipo == tipo && partida.tableroJuego.casillas[x][y - 1].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto(x, (y + 1)))//abajo
	{
		if(partida.tableroJuego.casillas[x][y + 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x][y + 1].ficha.tipo == tipo && partida.tableroJuego.casillas[x][y + 1].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto((x - 1), y))//izquierda
	{
		if(partida.tableroJuego.casillas[x - 1][y].ficha != null)
		{
			if(partida.tableroJuego.casillas[x - 1][y].ficha.tipo == tipo && partida.tableroJuego.casillas[x - 1][y].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto((x + 1), y))//derecha
	{
		if(partida.tableroJuego.casillas[x + 1][y].ficha != null)
		{
			if(partida.tableroJuego.casillas[x + 1][y].ficha.tipo == tipo && partida.tableroJuego.casillas[x + 1][y].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto((x - 1), (y - 1)))//de abajo arriba por la izquierda
	{
		if(partida.tableroJuego.casillas[x - 1][y - 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x - 1][y - 1].ficha.tipo == tipo && partida.tableroJuego.casillas[x - 1][y - 1].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto((x + 1), (y - 1)))//de abajo arriba por la derecha
	{
		if(partida.tableroJuego.casillas[x + 1][y - 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x + 1][y - 1].ficha.tipo == tipo && partida.tableroJuego.casillas[x + 1][y - 1].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto((x - 1), (y + 1)))//de arriba abajo por la izquierda
	{
		if(partida.tableroJuego.casillas[x - 1][y + 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x - 1][y + 1].ficha.tipo == tipo && partida.tableroJuego.casillas[x - 1][y + 1].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto((x + 1), (y + 1)))//de arriba abajo por la derecha
	{
		if(partida.tableroJuego.casillas[x + 1][y + 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x + 1][y + 1].ficha.tipo == tipo && partida.tableroJuego.casillas[x + 1][y + 1].ficha.equals(fichaActual))
				contador++;
		}
	}
	return contador;
}

//Funciones juego 2

/*
Nombre: estadoAnimoJuego1
Parametros: tipo(String), x(int), y(int)
Retorna: Boolean
Descripcion: Nos retorna un true si la ficha es feliz en X posicion o falso en el caso contrario
*/
function estadoAnimoJuego2(tipo, x, y)
{
	var casilla = partida.tableroJuego.getCasillaByIdFicha(this.id);
	return getPosibleJuego2(casilla.x, casilla.y, this.tipo, partida.tableroJuego.casillas[casilla.x][casilla.y].ficha) >= vecino;
}

/*
Nombre: dondeirJuego2
Parametros: tipo(String), x(int), y(int)
Retorna:
Descripcion: Funcion que cambia el fondo de las celdas segun si la ficha se siente agusto o no
*/
function dondeirJuego2(tipo, x, y)
{
	for(var i = 0; i < partida.tableroJuego.filas; i++)
	{
		for(var a = 0; a < partida.tableroJuego.colum; a++)
		{
			if(partida.tableroJuego.casillas[i][a].ficha == null)
			{
				if(getPosibleJuego2(i, a, tipo, partida.tableroJuego.casillas[x][y].ficha) >= vecino)
				{
					$("#"+partida.tableroJuego.casillas[i][a].id).addClass("casillaPosible");
				}
			}
		}
	}
}

/*
Nombre: getPosibleJuego2
Parametros: i(int), a(int), tipo(String), x(int), y(int), fichaActual(class Ficha)
Retorna: Int
Descripcion: Retorna el numero de coincidencia según las preferencias de la ficha
*/
function getPosibleJuego2(i, a, tipo, fichaActual)
{
	var x = i;
	var y = a;
	var contador = 0;
	if(rangoCorrecto(x, (y - 1)))//arriba
	{
		if(partida.tableroJuego.casillas[x][y - 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x][y - 1].ficha.tipo != tipo && partida.tableroJuego.casillas[x][y - 1].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto(x, (y + 1)))//abajo
	{
		if(partida.tableroJuego.casillas[x][y + 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x][y + 1].ficha.tipo != tipo && partida.tableroJuego.casillas[x][y + 1].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto((x - 1), y))//izquierda
	{
		if(partida.tableroJuego.casillas[x -1][y].ficha != null)
		{
			if(partida.tableroJuego.casillas[x - 1][y].ficha.tipo != tipo && partida.tableroJuego.casillas[x - 1][y].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto((x + 1), y))//derecha
	{
		if(partida.tableroJuego.casillas[x + 1][y].ficha != null)
		{
			if(partida.tableroJuego.casillas[x + 1][y].ficha.tipo != tipo && partida.tableroJuego.casillas[x + 1][y].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto((x - 1), (y - 1)))//de abajo arriba por la izquierda
	{
		if(partida.tableroJuego.casillas[x - 1][y - 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x - 1][y - 1].ficha.tipo != tipo && partida.tableroJuego.casillas[x - 1][y - 1].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto((x + 1), (y - 1)))//de abajo arriba por la derecha
	{
		if(partida.tableroJuego.casillas[x + 1][y - 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x + 1][y - 1].ficha.tipo != tipo && partida.tableroJuego.casillas[x + 1][y - 1].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto((x - 1), (y + 1)))//de arriba abajo por la izquierda
	{
		if(partida.tableroJuego.casillas[x - 1][y + 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x - 1][y + 1].ficha.tipo != tipo && partida.tableroJuego.casillas[x - 1][y + 1].ficha.equals(fichaActual))
				contador++;
		}
	}
	if(rangoCorrecto((x + 1), (y + 1)))//de arriba abajo por la derecha
	{
		if(partida.tableroJuego.casillas[x + 1][y + 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x + 1][y + 1].ficha.tipo != tipo && partida.tableroJuego.casillas[x + 1][y + 1].ficha.equals(fichaActual))
				contador++;
		}
	}
	return contador;
}

//Funciones juego de la vida
/*
Nombre: imprimirCelula
Parametros:  
Retorna: 
Descripcion: retorna un div para imprimir la celula
*/
function imprimirCelula()
{
	return "<div id='"+this.id+"' class='celula'></div>";
}

/*
Nombre: estadoCelula
Parametros:  x(int), y(int), celula(Ficha)
Retorna: 
Descripcion: Comprueba el estado de la celula retorna false para morir y true para seguir vivo
*/
function estadoCelula(x, y, fichaActual)
{
	var numeroCelulas = queHayAlrededor(x, y, fichaActual);
	if(numeroCelulas > 0) // sale una nueva celula y sigo vivo
	{
		if(numeroCelulas >= 3) //es mayor a 3 he de morir hay exceso de celulas
		{
			return false;
		}
		nacer(x, y);
		return true;
	}
	else //estoy solo me muero
	{
		return false;
	}
}

/*
Nombre: queHayAlrededor
Parametros: x(int), y(int), fichaActual(Ficha)
Retorna: 
Descripcion: Comprueba si el desplazamiento de la celula es correcto
*/
function queHayAlrededor(x, y, fichaActual)
{
	var contador = 0;
	if(rangoCorrecto(x, (y - 1)))//arriba
	{
		if(partida.tableroJuego.casillas[x][y - 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x][y - 1].ficha.equals(fichaActual) && partida.tableroJuego.casillas[x][y - 1].ficha.estado)
				contador++;
		}
	}
	if(rangoCorrecto(x, (y + 1)))//abajo
	{
		if(partida.tableroJuego.casillas[x][y + 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x][y + 1].ficha.equals(fichaActual) && partida.tableroJuego.casillas[x][y + 1].ficha.estado)
				contador++;
		}
	}
	if(rangoCorrecto((x - 1), y))//izquierda
	{
		if(partida.tableroJuego.casillas[x -1][y].ficha != null)
		{
			if(partida.tableroJuego.casillas[x - 1][y].ficha.equals(fichaActual) && partida.tableroJuego.casillas[x - 1][y].ficha.estado)
				contador++;
		}
	}
	if(rangoCorrecto((x + 1), y))//derecha
	{
		if(partida.tableroJuego.casillas[x + 1][y].ficha != null)
		{
			if(partida.tableroJuego.casillas[x + 1][y].ficha.equals(fichaActual) && partida.tableroJuego.casillas[x + 1][y].ficha.estado)
				contador++;
		}
	}
	if(rangoCorrecto((x - 1), (y - 1)))//de abajo arriba por la izquierda
	{
		if(partida.tableroJuego.casillas[x - 1][y - 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x - 1][y - 1].ficha.equals(fichaActual) && partida.tableroJuego.casillas[x - 1][y - 1].ficha.estado)
				contador++;
		}
	}
	if(rangoCorrecto((x + 1), (y - 1)))//de abajo arriba por la derecha
	{
		if(partida.tableroJuego.casillas[x + 1][y - 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x + 1][y - 1].ficha.equals(fichaActual) && partida.tableroJuego.casillas[x + 1][y - 1].ficha.estado)
				contador++;
		}
	}
	if(rangoCorrecto((x - 1), (y + 1)))//de arriba abajo por la izquierda
	{
		if(partida.tableroJuego.casillas[x - 1][y + 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x - 1][y + 1].ficha.equals(fichaActual) && partida.tableroJuego.casillas[x - 1][y + 1].ficha.estado)
				contador++;
		}
	}
	if(rangoCorrecto((x + 1), (y + 1)))//de arriba abajo por la derecha
	{
		if(partida.tableroJuego.casillas[x + 1][y + 1].ficha != null)
		{
			if(partida.tableroJuego.casillas[x + 1][y + 1].ficha.equals(fichaActual) && partida.tableroJuego.casillas[x + 1][y + 1].ficha.estado)
				contador++;
		}
	}
	return contador;
}

/*
Nombre: pasoAlante
Parametros: celula(Ficha), x(int), y(int), oldx(int), oldy(int)
Retorna: 
Descripcion: Comprueba si el desplazamiento de la celula es correcto
*/
function pasoAlante(celula, x, y)
{
	var salir = false;
	var random = Math.floor((Math.random()*8)+1);
	switch(random)
	{
		case 1:
			if(rangoCorrecto(x, (y - 1)))//arriba
			{
				if(partida.tableroJuego.casillas[x][y - 1].ficha == null)
				{
					desplazar(celula, x, (y - 1), x, y);
					salir = true;
				}
			}
		break;
		case 2:
			if(rangoCorrecto(x, (y + 1)))//abajo
			{
				if(partida.tableroJuego.casillas[x][y + 1].ficha == null)
				{
					desplazar(celula, x, (y + 1), x, y);
					salir = true;
				}
			}
		break;
		case 3:
			if(rangoCorrecto((x - 1), y))//izquierda
			{
				if(partida.tableroJuego.casillas[x - 1][y].ficha == null)
				{
					desplazar(celula, (x - 1), y, x, y);
					salir = true;
				}
			}
		break;
		case 4:
			if(rangoCorrecto((x + 1), y))//derecha
			{
				if(partida.tableroJuego.casillas[x + 1][y].ficha == null)
				{
					desplazar(celula, (x + 1), y, x, y);
					salir = true;
				}
			}
		break;
		case 5:
			if(rangoCorrecto((x - 1), (y - 1)))//de abajo arriba por la izquierda
			{
				if(partida.tableroJuego.casillas[x - 1][y - 1].ficha == null)
				{
					desplazar(celula, (x - 1), (y - 1), x, y);
					salir = true;
				}
			}
		break;
		case 6:
			if(rangoCorrecto((x + 1), (y - 1)))//de abajo arriba por la derecha
			{
				if(partida.tableroJuego.casillas[x + 1][y - 1].ficha == null)
				{
					desplazar(celula, (x + 1), (y - 1), x, y);
					salir = true;
				}
			}
		break;
		case 7:
			if(rangoCorrecto((x + 1), (y + 1)))//de arriba abajo por la derecha
			{
				if(partida.tableroJuego.casillas[x + 1][y + 1].ficha == null)
				{
					desplazar(celula, (x + 1), (y + 1), x, y);
					salir = true;
				}
			}
		break;
		case 8:
			if(rangoCorrecto((x - 1), (y + 1)))//de arriba abajo por la izquierda
			{
				if(partida.tableroJuego.casillas[x - 1][y + 1].ficha == null)
				{
					desplazar(celula, (x - 1), (y + 1), x, y);
					salir = true;
				}
			}
		break;
	}
}

/*
Nombre: desplazar
Parametros: celula(Ficha), x(int), y(int), oldx(int), oldy(int)
Retorna: 
Descripcion: Mueve de forma aleatoria una celula
*/
function desplazar(celula, x, y, oldx, oldy)
{
	partida.tableroJuego.casillas[oldx][oldy].ficha = null;
	partida.tableroJuego.casillas[x][y].ficha = celula;
}

/*
Nombre: nacer
Parametros: x(int), y(int)
Retorna: 
Descripcion: Reproduce una celula en una posicion aleatoria
*/
function nacer(x, y)
{
	var contador = 0;
	if(rangoCorrecto(x, (y - 1)) && contador == 0)//arriba
	{
		if(partida.tableroJuego.casillas[x][y - 1].ficha == null)
		{
			partida.tableroJuego.casillas[x][y - 1].ficha =  new ficha("fichaA",true, "cel"+numeroCelulas, estadoCelula, pasoAlante, imprimirCelula);
			partida.tableroJuego.casillas[x][y - 1].actualizarCasilla();
			contador++;
		}
	}
	if(rangoCorrecto(x, (y + 1))  && contador == 0)//abajo
	{
		if(partida.tableroJuego.casillas[x][y + 1].ficha == null)
		{
			partida.tableroJuego.casillas[x][y + 1].ficha =  new ficha("fichaA",true, "cel"+numeroCelulas, estadoCelula, pasoAlante, imprimirCelula);
			partida.tableroJuego.casillas[x][y + 1].actualizarCasilla();
			contador++;
		}
	}
	if(rangoCorrecto((x - 1), y)  && contador == 0)//izquierda
	{
		if(partida.tableroJuego.casillas[x -1][y].ficha == null)
		{
			partida.tableroJuego.casillas[x - 1][y].ficha =  new ficha("fichaA",true, "cel"+numeroCelulas, estadoCelula, pasoAlante, imprimirCelula);
			partida.tableroJuego.casillas[x - 1][y].actualizarCasilla();
			contador++;
		}
	}
	if(rangoCorrecto((x + 1), y)  && contador == 0)//derecha
	{
		if(partida.tableroJuego.casillas[x + 1][y].ficha == null)
		{
			partida.tableroJuego.casillas[x + 1][y].ficha =  new ficha("fichaA",true, "cel"+numeroCelulas, estadoCelula, pasoAlante, imprimirCelula);
			partida.tableroJuego.casillas[x + 1][y].actualizarCasilla();
			contador++;
		}
	}
	if(rangoCorrecto((x - 1), (y - 1))  && contador == 0)//de abajo arriba por la izquierda
	{
		if(partida.tableroJuego.casillas[x - 1][y - 1].ficha == null)
		{
			partida.tableroJuego.casillas[x - 1][y - 1].ficha =  new ficha("fichaA",true, "cel"+numeroCelulas, estadoCelula, pasoAlante, imprimirCelula);
			partida.tableroJuego.casillas[x - 1][y - 1].actualizarCasilla();
			contador++;
		}
	}
	if(rangoCorrecto((x + 1), (y - 1))  && contador == 0)//de abajo arriba por la derecha
	{
		if(partida.tableroJuego.casillas[x + 1][y - 1].ficha == null)
		{
			partida.tableroJuego.casillas[x + 1][y - 1].ficha =  new ficha("fichaA",true, "cel"+numeroCelulas, estadoCelula, pasoAlante, imprimirCelula);
			partida.tableroJuego.casillas[x + 1][y - 1].actualizarCasilla();
			contador++;
		}
	}
	if(rangoCorrecto((x - 1), (y + 1))  && contador == 0)//de arriba abajo por la izquierda
	{
		if(partida.tableroJuego.casillas[x - 1][y + 1].ficha == null)
		{
			partida.tableroJuego.casillas[x - 1][y + 1].ficha =  new ficha("fichaA",true, "cel"+numeroCelulas, estadoCelula, pasoAlante, imprimirCelula);
			partida.tableroJuego.casillas[x - 1][y + 1].actualizarCasilla();
			contador++;
		}
	}
	if(rangoCorrecto((x + 1), (y + 1))  && contador == 0)//de arriba abajo por la derecha
	{
		if(partida.tableroJuego.casillas[x + 1][y + 1].ficha == null)
		{
			partida.tableroJuego.casillas[x + 1][y + 1].ficha =  new ficha("fichaA",true, "cel"+numeroCelulas, estadoCelula, pasoAlante, imprimirCelula);
			partida.tableroJuego.casillas[x + 1][y + 1].actualizarCasilla();
			contador++;
		}
	}
	if(contador > 0)
	{
		numeroCelulas++;
	}
}

//Otras funciones
/*
Nombre: rangoCorrecto
Parametros: x(int), y(int)
Retorna: Boolean
Descripcion: Retorna true o false según si las x o las y se pasan del rango del tablero
*/
function rangoCorrecto(x, y)
{
	return ((x >= 0 && y >= 0) && (x < partida.tableroJuego.filas && y < partida.tableroJuego.colum));
}
