/*
	Nombre función: 
		letrasAnim(layer, stage);
	Entradas:
		Layer -> donde vamos a dibujar 
				 (objeto) Kinetic.Layer()
		stage -> Lienzo donde se ponen los layer
				 (objeto) Kinetic.Stage()
	Salidas:
		- no data -
	Descripción:
		Creación y animación las felicitaciones navideñas
*/

function letrasAnim(layer, stage)
{
	var texto = new Kinetic.Text({
        x: 340,
        y: 200,
        text: 'Bon Nadal',
        fontSize: 0,
        fontFamily: 'Ruge Boogie',
        fill: '#FFBF00',
        stroke: 'black',
        strokeWidth: 2
    });

	layer.add(texto);
	stage.add(layer);

	var scale;
	var anim = new Kinetic.Animation(function(frame) {
		if(texto.getFontSize() <= 90)
		{
    		texto.setFontSize(texto.getFontSize() + 1);
    	}
    	else
    	{
    		 anim.stop();
    	}
    }, layer);
    anim.start();
}