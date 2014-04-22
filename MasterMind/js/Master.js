/*Funciones de la partida*/
var masterMind = {
	
	oportunidades : 0,
	numeroIntentos : 0,
	partidaGanada : false,
	codigoSecreto : new Array(),
	
	//inicializa la partida
	initPartida : function(numeroIntentos){
		masterMind.numeroIntentos = numeroIntentos;
		masterMind.oportunidades = numeroIntentos;
		masterMind.generarCodigo();
		MasterUi.dibujarFila();
	}, 
	
	//pasar turno de fichas
	pasarTurno : function(){
		
		if(masterMind.numeroIntentos > 0)
		{
			masterMind.fichasCorrectas(masterMind.getFichas());
			$("#jugada"+masterMind.numeroIntentos).attr("activo", "false");
			masterMind.quitarEventosFicha();
			masterMind.numeroIntentos = masterMind.numeroIntentos - 1;
			if(masterMind.numeroIntentos == 0){
				if(!masterMind.partidaGanada){
					MasterUi.mostrarResumenPerder(masterMind.codigoSecreto);
				}
				else
				{
					masterMind.partidaGanada = false;
				}
			}
			else
			{
				MasterUi.dibujarFila();
			}
		}
	},

	//retorna el numero de la ficha segúnel drag and drop
	getFichas : function(){
		var resultado = new Array();
		for(var i = 0; i < 5; i++)
		{
			resultado[i] = parseInt($("#ficha"+masterMind.numeroIntentos+i).attr("seleccion"));
		}
		return resultado;
	},

	//genera el código secreto
	generarCodigo : function(){
		for(var i = 0; i < 5; i++)
		{
			masterMind.codigoSecreto[i] = Math.floor((Math.random()*6)+0);
		}
		utils.alert("Código secreto: "+masterMind.codigoSecreto[0]+" - " +masterMind.codigoSecreto[1]+" - " +masterMind.codigoSecreto[2]+" - " +masterMind.codigoSecreto[3]+" - " +masterMind.codigoSecreto[4]+" -> "+masterMind.codigoSecreto.length);
	},

	//valida desde caja rápida
	cajaRapida : function(resultadoCajarapida){
		var pattern = new RegExp(/^[0-6]{5}$/);
		if(pattern.test(resultadoCajarapida))//hay una string?
		{
			if(masterMind.numeroIntentos > 0)
			{
				var arrayJugada = new Array();
				var arrayPintar = new Array();
				for(var i = 0; i < resultadoCajarapida.length; i++){
					arrayJugada[i] = resultadoCajarapida[i];
				}
				arrayPintar = arrayJugada.slice(0);
				masterMind.fichasCorrectas(arrayJugada);
				$("#jugada"+masterMind.numeroIntentos).attr("activo", "false");
				MasterUi.dibujarFichasCajaRapida(arrayPintar);
				masterMind.quitarEventosFicha();
				masterMind.numeroIntentos = masterMind.numeroIntentos - 1;
				if(masterMind.numeroIntentos == 0)
				{
					if(!masterMind.partidaGanada)
					{
						MasterUi.mostrarResumenPerder(masterMind.codigoSecreto);
					}
					else
					{
						masterMind.partidaGanada = false;
					}
				}
				else
				{
					MasterUi.dibujarFila();
				}
			}
		}
		else
		{
			MasterUi.mostrarModal("Error", "Solo se pueden introducir números del cero al seis");
		}
	},

	//Nos indica el numero de fichas correctas
	fichasCorrectas : function(listaFichas){
		var origenAux = (masterMind.codigoSecreto).slice(0);
		var listaFichasAux = listaFichas;
		
		if(listaFichas.toString() == masterMind.codigoSecreto.toString())//son iguales?
		{
			masterMind.partidaGanada = true;
			for(var i = 0; i < masterMind.codigoSecreto.length; i++)
			{
				MasterUi.dibujarPista("ok");
			}
			MasterUi.reiniciarUi();
			MasterUi.mostrarModal("Felicidades has acertado", "Número de intentos: "+masterMind.oportunidades+"<br><br> Número de Jugadas: "+ (masterMind.oportunidades - (masterMind.numeroIntentos - 1)) +"<br>");
		}
		else
		{
			this.comprobar(listaFichasAux, origenAux);
		}
	},

	comprobar : function(listaUsuario, codigo){
		var coinciden = false;
		for(var i = 0; i < listaUsuario.length;)//primera vuelta, miramos las fichas en que su posición y color sean las correctas y poner las fichas negras
		{
			if(listaUsuario[i] == codigo[i])
			{	
				MasterUi.dibujarPista("ok");
				listaUsuario.splice(i, 1);
				codigo.splice(i, 1);
				i = 0;
				utils.alert("Número bien puesto-> "+codigo[i]);
			}
			else
			{
				i++;
			}
		}
		for(var i = 0; i < listaUsuario.length;)//Segunda vuelta miramos si hay mas coincidencias para poner las fichas blancas
		{
			for(var a = 0; a < codigo.length; a++)
			{
				if(listaUsuario[i] == codigo[a])
				{
					utils.alert("Número mal puesto -> "+codigo[i]);
					MasterUi.dibujarPista("ko");
					listaUsuario.splice(i, 1);
					codigo.splice(a, 1);
					coinciden = true;
				}
			}
			if(coinciden)
			{
				coinciden = false;
				i = 0;
			}
			else
			{
				i++;
			}
		}
		for(var i = 0; i < codigo.length; i++) // y por último, si aún queda algún elemento en el array significa que hay fichas que no estaán bien puestas ni coinciden con el color
		{
			utils.alert("No has puesto el número -> "+codigo[i]);
			MasterUi.dibujarPista("no");
		}
	},

	quitarEventosFicha : function(){
		for(var i = 0; i < 5; i++)
		{
			var partida = masterMind.numeroIntentos;
			$( "#ficha"+partida+i).unbind( "click" );
		}
	}
}