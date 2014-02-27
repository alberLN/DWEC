function casilla(x, y, ficha, actualizarCasilla) {
	this.x = x;
	this.y = y;
	this.ficha = ficha;
	this.id = "casilla"+x+y;
	this.actualizarCasilla = actualizarCasilla;
	
	/*
	Nombre: pintar
	Parametros:
	Retorna: Div con la ficha ya dibujada
	Descripcion: Retorna un div con la ficha dibujada
	*/
	this.pintar = function()
	{
		if(this.ficha != null)
		{
			return "<div class='casilla' id='"+this.id+"'>"+this.ficha.getFicha()+"</div>";
		}
		else
		{
			return "<div class='casilla' id='"+this.id+"'></div>";
		}
	}
	
	/*
	Nombre: drop
	Parametros:
	Retorna:
	Descripcion: Evento por el cual se actualiza el estado de las fichas y casillas en el momento en que la ficha se deja encima de
	la casilla
	*/
	this.drop = function()
	{
		$("#"+this.id).droppable({
			drop: function(e, ui)
			{
				if($("#"+$(this).attr("id")).hasClass("casillaPosible"))
				{
					var casillaOrigen = partida.tableroJuego.getCasillaByIdFicha($(ui.helper).attr("id"));
					var casillaDestino = partida.tableroJuego.getCasillaByIdCasilla($(this).attr("id"));
					var ficha = partida.tableroJuego.casillas[casillaOrigen.x][casillaOrigen.y].ficha;
					$("#"+partida.tableroJuego.casillas[casillaDestino.x][casillaDestino.y].id).append(casillaOrigen.ficha.getFicha());
					partida.tableroJuego.casillas[casillaDestino.x][casillaDestino.y].ficha = casillaOrigen.ficha;
					partida.tableroJuego.casillas[casillaOrigen.x][casillaOrigen.y].ficha = null;
				}
			}
		});
	}
}