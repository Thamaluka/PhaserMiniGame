Game.Preloader = function(game){
	this.preloadBar = null;
};

Game.Preloader.prototype = {
	preload:function(){
		this.load.image('sky', 'assets/sky.png');
	    this.load.image('ground', 'assets/platform.png');
	    this.load.image('star', 'assets/star.png');
	    this.load.image('startButton','assets/button1.png');
	    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);

	    this.load.audio('jump','sons/Jump.wav');
	 	this.load.audio('coin','sons/Coin.wav');
	 	this.load.audio('music','sons/Music.wav');

	    var platforms;
	    var player;
	    var cursors;

	    var stars;
	    var countStars;
	    var score;
	    var scoreText;

	    var timer;
	    var currentTimer;

	    var jumpSound;
	    var coinSound;
	    var musicSound;

	   	var isGame;

	    var button;

	    var timeTxt;
	    var timer;
	    var sec ;
	    var min ;
	},
	create:function(){
		this.state.start('Level1');
	}
}

