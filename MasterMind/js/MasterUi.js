/*Objeto que administra la inerfaz grafica*/
var MasterUi = {

	//Prepara la interfaz
	dibujarUi : function(){
		$("#divInfo").fadeOut("slow", function(){
			$("#tableroJuego").fadeIn("fast");
		});
		$("#tableroPartidas").empty();
	},
	
	setCookieSlide : function(){
		if(cookie.exsistCookie){
			var jugadas = cookie.getCookie("numerojugdas");
			$( "#totalOportunidades" ).text(jugadas);
			$( "#slider" ).slider( "value", parseInt(jugadas));
		}
	},

	mostrarModal : function(titulo, desc){
		$("#tituloModal").append(titulo);
		$("#cuerpoModal").append(desc);
		$("#modal").fadeIn("fast");
	},

	esconderModal : function(){
		$("#tituloModal").empty();
		$("#cuerpoModal").empty();
		$("#modal").fadeOut("fast");
	},

	//Limpia todas las fichas del tablero para empezar una nueva partida
	reiniciarUi : function(){
		$("#tableroJuego").fadeOut("slow", function(){
			$("#divInfo").fadeIn("fast");
		});
		$('#slider').slider('value', 8);
		$( "#totalOportunidades").text(8);
		$("#tableroPartidas").empty();
	},
	
	//dibuja las filas vacias
	dibujarFila : function(){
		var partida = masterMind.numeroIntentos; 
		$("#tableroPartidas").append('<div class="jugada" id="jugada'+partida+'" activo="true"></div>');
		$("#jugada"+partida).append('<div class="jugadaFichas" id="jugadaFichas'+partida+'"></div>');
		$("#jugada"+partida).append('<div class="jugadaAciertos" id="jugadaAciertos'+partida+'"></div>');
		for(var i = 0; i < 5; i++){
			$("#jugadaFichas"+partida).append('<div class="ficha" id="ficha'+partida+i+'" seleccion="0"></div>');
			eventos.setDropFicha("ficha"+partida+i);
			eventos.quitarFicha("ficha"+partida+i);
		}
		for(var i = 0; i < 5; i++){
			$("#jugadaAciertos"+partida).append('<div class="acierto" id="acierto'+partida+i+'"></div>');
		}
	},

	//Dibuja las pistas según la combinación insertada en el tablero de caja rapida
	dibujarFichasCajaRapida : function(array){
		var partida = masterMind.numeroIntentos; 
		for(var i = 0; i < array.length; i++)
		{
			switch(parseInt(array[i]))
			{
				case 1:
				$("#ficha"+partida+i).attr("class", "ficha fichaRosa");
				break;
				case 2:
				$("#ficha"+partida+i).attr("class", "ficha fichaLila");
				break;
				case 3:
				$("#ficha"+partida+i).attr("class", "ficha fichaAmarilla");
				break;
				case 4:
				$("#ficha"+partida+i).attr("class", "ficha fichaAzul");
				break;
				case 5:
				$("#ficha"+partida+i).attr("class", "ficha fichaRoja");
				break;
				case 6:
				$("#ficha"+partida+i).attr("class", "ficha fichaNaranja");
				break;
			}
		}
		$("#cajaRapida").val("");
	},
	
	dibujarPista : function(claseResultado){
		var partida = masterMind.numeroIntentos; 
		$("#jugadaAciertos"+partida).append('<div class=" pista '+claseResultado+'"></div>');
	},

	//Muestra el resúmen de la partida
	mostrarResumenPerder : function(array){
		var codigo = "";
		MasterUi.reiniciarUi();
		MasterUi.mostrarModal("Has perdido", "Número de intentos: "+masterMind.oportunidades+"<br> <br> El código era:");
		$("#cuerpoModal").append('<br>');
		for(var i = 0; i < array.length; i++)
		{
			switch(parseInt(array[i]))
			{
				case 0:
				$("#cuerpoModal").append('<div class="ficha"></div>');
				break;
				case 1:
				$("#cuerpoModal").append('<div class="ficha fichaRosa"></div>');
				break;
				case 2:
				$("#cuerpoModal").append('<div class="ficha fichaLila"></div>');
				break;
				case 3:
				$("#cuerpoModal").append('<div class="ficha fichaAmarilla"></div>');
				break;
				case 4:
				$("#cuerpoModal").append('<div class="ficha fichaAzul"></div>');
				break;
				case 5:
				$("#cuerpoModal").append('<div class="ficha fichaRoja"></div>');
				break;
				case 6:
				$("#cuerpoModal").append('<div class="ficha fichaNaranja"></div>');
				break;
			}
		}
	}
}