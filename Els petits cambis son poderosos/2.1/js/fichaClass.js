function ficha(tipo, estado, id_ficha, estadoAnimo, dondeir, getFicha){
	this.tipo = tipo;
	this.estado = estado;
	this.id = id_ficha;
	this.estadoAnimo = estadoAnimo;
	this.dondeir = dondeir;
	this.getFicha = getFicha;
	
	/*
	Nombre: drop
	Parametros:
	Retorna: 
	Descripcion: al empezar el drag nos dice en que sitio podemos ir
	*/
	this.drop = function()
	{
		$("#"+this.id).draggable({ 
			revert: 'invalid', 
			start: function(ev, ui){
				var casilla = partida.tableroJuego.getCasillaByIdFicha($(ui.helper).attr("id"));
				casilla.ficha.dondeir(casilla.ficha.tipo, casilla.x, casilla.y);
			},
			stop : function()
			{
				partida.tableroJuego.actualizarCasillas(); //error
			}
		});
	}
	
	/*
	Nombre: turnoVida
	Parametros:
	Retorna: 
	Descripcion: avanzamos un estado a las celulas
	*/
	this.turnoVida = function()
	{
		var celdaDondeEstoy = partida.tableroJuego.getCasillaByIdFicha(this.id);
		if(this.estado)
		{
			this.dondeir(celdaDondeEstoy.ficha, celdaDondeEstoy.x, celdaDondeEstoy.y);
			celdaDondeEstoy = partida.tableroJuego.getCasillaByIdFicha(this.id);
			this.estado = this.estadoAnimo(celdaDondeEstoy.x, celdaDondeEstoy.y, celdaDondeEstoy.ficha);
		}
		else
		{
			partida.tableroJuego.casillas[celdaDondeEstoy.x][celdaDondeEstoy.y].ficha = null;
		}
	}
	
	/*
	Nombre: equals
	Parametros: Objeto Ficha
	Retorna: Boolean
	Descripcion: nos dice si las fichas son iguales, en el caso de que lo sean nos retorna un true y en caso contrario un falso
	*/
	this.equals = function(ficha)
	{
		return this.id != ficha.id;
	}
}