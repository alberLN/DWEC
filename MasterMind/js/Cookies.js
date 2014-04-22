/*Objeto de administración de cookies*/
var cookie = {

	//crea cookie
	setCookie : function(cName, cValue, exdays){
		var d = new Date();
		d.setTime( d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cName + "=" + cValue + "; " + expires;
	},

	//existe la cookie? en caso de que no exista la crea
	exsistCookie : function(){
		var numeroJugadas = cookie.getCookie("numerojugdas");
		if (numeroJugadas != "")
		{
			return true;
		}
		else 
		{
			cookie.setCookie("numerojugdas",parseInt($( "#slider" ).slider( "value" )),365);
			return false;
		}
	},

	//dame el valor de la cookie
	getCookie : function(cName){
		var name = cName + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) 
		{
		  var c = ca[i].trim();
		  if (c.indexOf(name)==0){
		  	return c.substring(name.length,c.length);
		  }
		}
		return "";
	}
}