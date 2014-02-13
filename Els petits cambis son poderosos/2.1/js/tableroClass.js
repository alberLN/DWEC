function tablero(fila, colum, cantidadA, cantidadB){
	this.filas = fila;
	this.colum = colum;
	this.cantidadA = cantidadA;
	this.cantidadB = cantidadB;
	this.casillas = new Array();
	/*
	Nombre: pintarTablero
	Parametros:
	Retorna: 
	Descripcion: pinta solo una vez el tablero
	*/
	this.pintarTablero = function()
	{
		for(var i = 0; i < this.filas; i++)
		{
			$("#tablero").append("<div id='fila"+i+"'></div>");
			for(var a = 0; a < this.colum; a++)
			{
				$("#fila"+i).append(this.casillas[i][a].pintar());
				this.casillas[i][a].drop();
			}
		}
		this.actualizarCasillas();
	}
	
	/*
	Nombre: setCasillas
	Parametros:
	Retorna: 
	Descripcion: inicializa el array de casillas
	*/
	this.setCasillas = function() {
		var contadorA = 0;
		var contadorB = 0;
		var salir = false;
		
		for(var i = 0; i < this.filas; i++)
		{
			this.casillas[i] = new Array();
			for(var a = 0; a < this.colum; a++)
			{
				this.casillas[i][a] = new casilla(i, a, null, actualizarFicha);
			}
		}
		
		while(!salir)
		{
			for(var i = 0; i < this.filas; i++)
			{
				var x = Math.floor((Math.random()*(this.filas - 1))+0);
				var y = Math.floor((Math.random()*(this.colum - 1))+0);
				var tipo = Math.floor((Math.random()*2)+1);
				if(this.casillas[x][y].ficha == null)
				{
					if(tipo == 1)
					{
						if(contadorA < this.cantidadA)
						{
							this.casillas[x][y].ficha = new ficha("fichaA",0, "fichaA"+contadorA, partida.estadoAnimo, partida.dondeir, partida.getFicha);
							contadorA++;
						}
					}
					else
					{
						if(contadorB < this.cantidadB)
						{
							this.casillas[x][y].ficha = new ficha("fichaB",0, "fichaB"+contadorB, partida.estadoAnimo, partida.dondeir, partida.getFicha);
							contadorB++;
						}
						
					}
				}
			}
			salir = (this.cantidadA + this.cantidadB) - (contadorA + contadorB) == 0 ? true : false;
		}
	}
		
	//JUEGO DE LA VIDA
	/*
	Nombre: empezarJuegoVida
	Parametros:
	Retorna: 
	Descripcion: introduce las celulas y las pinta en el tablero
	*/
	this.empezarJuegoVida = function()
	{
		//inicializamos el array;
		for(var i = 0; i < this.filas; i++)
		{
			this.casillas[i] = new Array();
			for(var a = 0; a < this.colum; a++)
			{
				this.casillas[i][a] = new casilla(i, a, null, actualizarCelula);
			}
		}
		for(var x = 0; x < this.filas; x++)//crear fichas
		{
			for(var y = 0; y < this.colum; y++)
			{
				if( y == 4 || y == 5)
				{
					if( x == 4 || x == 5)
					{
						this.casillas[x][y].ficha = new ficha("fichaA",true, "cel"+numeroCelulas, partida.estadoAnimo, partida.dondeir, partida.getFicha);
						numeroCelulas++;
					}
					else
					{
						this.casillas[x][y].ficha = null;
					}
				}
				else
				{
					this.casillas[x][y].ficha = null;
				}
			}
		}
		for(var i = 0; i < this.filas; i++)//dar vida a las fichas
		{
			$("#tablero").append("<div id='fila"+i+"'></div>");
			for(var a = 0; a < this.colum; a++)
			{
				$("#fila"+i).append(this.casillas[i][a].pintar());
			}
		}
	}
	
	/*
	Nombre: pasarTurno
	Parametros:
	Retorna: 
	Descripcion: haces evolucionar la partida
	*/
	this.pasarTurno = function()
	{
		for(var i = 0; i < this.filas; i++)
		{
			for(var a = 0; a < this.colum; a++)
			{
				if(this.casillas[i][a].ficha != null)
				{
					this.casillas[i][a].ficha.turnoVida();
				}
			}
		}
		this.actualizarCasillas();
	}
	
	//FUNCIONES GENERALES
	
	//retorna una casilla segun la id de la ficha que se le pasa
	this.getCasillaByIdFicha = function(idFicha)
	{
		for(var i = 0; i < this.filas; i++)
		{
			for(var a = 0; a < this.colum; a++)
			{
				if(this.casillas[i][a].ficha != null)
				{
					if(this.casillas[i][a].ficha.id == idFicha)
					{
						return this.casillas[i][a];
					}
				}
			}
		}
	}
	
	//retorna una casilla segun la id de la casilla que se le pasa
	this.getCasillaByIdCasilla = function(idCasilla)
	{
		for(var i = 0; i < this.filas; i++)
		{
			for(var a = 0; a < this.colum; a++)
			{
				if(this.casillas[i][a].id == idCasilla)
				{
					return this.casillas[i][a];
				}
			}
		}
	}
	
	//actualiza todas las casillas del tablero
	this.actualizarCasillas = function()
	{
		for(var i = 0; i < this.filas; i++)
		{
			for(var a = 0; a < this.colum; a++)
			{
				this.casillas[i][a].actualizarCasilla();
			}
		}
	}
}