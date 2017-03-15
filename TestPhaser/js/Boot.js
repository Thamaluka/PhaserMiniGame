var Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype = {
	init:function(){
		this.state.disableVisibilityChange = true;
	},

	preload:function(){
		
	},

	create:function(){

		this.state.start('Preloader');
	}
}

