Game.Win = function (game) {};

Game.Win.prototype= {
	create: function(){

		this.add.sprite(0,0,'sky');
		var button = this.add.button(this.world.centerX - 95, 400, 'startButton', actionOnClick, this, 2, 1, 0);
		var txt = this.add.text(button.x + 10,button.y + 20,"Jogar novamente",{fontSize: '15px',fill:'#000'});



		var playerScore = this.add.text(this.world.centerX -130,this.world.centerY - 100,"Timer "+timeTxt.text,{fontSize: '50px',fill:'#000'});
	}

}
