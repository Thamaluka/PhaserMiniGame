var Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype = {
	init:function(){
		this.state.disableVisibilityChange = true;
	},

	preload:function(){
		this.load.image('sky','assets/sky.png');
	},

	create:function(){
		this.state.start('Preloader');
	}
}

