/*Eventos*/

//al cargarse el documento se ha de inicializar todo
jQuery(document).ready(function(){
	//introducir todos los eventos a las fichas para el drag
	for(var i = 1; i <= 6; i++)
	{
		$("#"+i).draggable({revert: true});
	}

	$("#iniciarPartida").click(function(){
		var oportunidades = parseInt($( "#slider" ).slider( "value" ));
		MasterUi.dibujarUi();
		masterMind.initPartida(oportunidades);
	});

	$("#pasarTurno").click(function(){
		masterMind.pasarTurno();
	});

	//inicializamos slider
	$( "#slider" ).slider({
      range: "min",
      value: 8,
      min: 1,
      max: 15,
      slide: function( event, ui ) {
        $( "#totalOportunidades" ).text(ui.value );
        cookie.setCookie("numerojugdas", parseInt(ui.value));
      }
    });

	//Detecta cuando se ha pulsado el intro para la caja rápida
	$("body").keydown(function(event) {
		if(event.which == 13) {
			if($("#cajaRapida").val() != "")
			{
				masterMind.cajaRapida($("#cajaRapida").val());
			}
		}
	});

	$("#cerrarModal").click(function(){
		MasterUi.esconderModal();
	});
});

var eventos = {

	//funcion poner drop a los huecos
	setDropFicha : function(id){
		$("#"+id).droppable({
		    accept: ".ficha",
	      	drop: function( event, ui ) {
	      		var fichaDropedId = ui.helper.context.id;
	      		var activo = $("#"+this.id).parent().parent().attr("activo");
	      		if(activo == "true")
	      		{
	      			$("#"+this.id).attr("Class", $("#"+fichaDropedId).attr("Class"));
	      			$("#"+this.id).attr("Seleccion", fichaDropedId);
	      		}
	        }
	    });
	},

	quitarFicha : function(id){
		$("#"+id).click(function(){
			var activo = new Boolean($("#"+this.id).parent().parent().attr("activo"));
			if(activo)
			{
				$("#"+this.id).attr("class", "ficha");
				$("#"+this.id).attr("Seleccion", "0");
			}
		});
	}

}