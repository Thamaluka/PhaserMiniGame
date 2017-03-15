
Game.MainMenu = function(game){};



Game.MainMenu.prototype = {
	create:function(){
		this.add.sprite(0,0,'sky');

		var button = this.add.button(this.world.centerX - 95, 400, 'startButton', actionOnClick, this, 2, 1, 0);
		var txt = this.add.text(button.x + 45,button.y + 10,"Play",{fontSize: '32px',fill:'#000'});
	}
}

function actionOnClick(){
		this.state.start('Level1');
}
