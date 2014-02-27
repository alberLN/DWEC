function juego(tipoJuego, porcientoVacias, porCientoFichasAmarillas)
{
	this.porcientoVacias = porcientoVacias;
	this.porCientoFichasAmarillas = porCientoFichasAmarillas;
	this.casillas;
	this.vecinos;
	this.tipoJuego = tipoJuego;
	this.tableroJuego;
	this.fichasAmarillas;
	this.fichasAzules;
	
	//CALLBACKS PARA LOS OBJETOS
	this.dondeir;
	this.estadoAnimo;
	this.getFicha;
	
	/*
	Nombre: initGame
	Parametros:
	Retorna: 
	Descripcion: Inicializa el juego seleccionado
	*/
	this.initGame = function()
	{
		this.casillas = (100 * this.porcientoVacias) / 100;
		if(this.tipoJuego != 3)
		{
			this.getFichas(0);
			this.getFichas(1);
		}
		switch(this.tipoJuego)
		{
			case 1://juego petits cambis normal
				this.dondeir = dondeirJuego1;
				this.estadoAnimo = estadoAnimoJuego1;
				this.getFicha = getDivFicha;
				this.vecinos = 1;
				this.tableroJuego = new tablero(10, 10, this.fichasAmarillas, this.fichasAzules);
				this.tableroJuego.setCasillas();
				this.tableroJuego.pintarTablero();
			break;
			case 2://juego petits cambis solo un vecino diferente
				this.dondeir = dondeirJuego2;
				this.estadoAnimo = estadoAnimoJuego2;
				this.getFicha = getDivFicha;
				this.vecinos = 1;
				this.tableroJuego = new tablero(10, 10, this.fichasAmarillas, this.fichasAzules);
				this.tableroJuego.setCasillas();
				this.tableroJuego.pintarTablero();
			break;
			case 3://juego de la vida con celulas
				this.dondeir = pasoAlante;
				this.estadoAnimo = estadoCelula;
				this.getFicha = imprimirCelula;
				this.tableroJuego = new tablero(10, 10, null, null);
				this.tableroJuego.empezarJuegoVida();
			break;
		}
	}
	
	//calcula el numero de fichas según el tipo y el tanto por cierto
	this.getFichas = function(tipoFicha)
	{
		switch(tipoFicha)
		{
			case 0://fichas amarillas
				this.fichasAmarillas = Math.floor((this.porCientoFichasAmarillas * this.casillas)/100);
			break;
			case 1://fichas azules
				this.fichasAzules = Math.floor(this.casillas - this.fichasAmarillas);
			break;
		}
	}
}