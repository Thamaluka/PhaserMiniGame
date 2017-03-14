var game = new Phaser.Game(800, 600, Phaser.AUTO, '');


var mainMenu = {
	preload: function(){
		 game.load.image('sky', 'assets/sky.png');
		 game.load.image('startButton','assets/button1.png');
	},
	create: function(){
		game.add.sprite(0,0,'sky');
		button = game.add.button(game.world.centerX - 100, 300,'startButton',actionOnClick,this,2,1,0);

	},
	update:function(){

	}

};


game.state.add('mainMenu',mainMenu);
game.state.start('mainMenu');


function actionOnClick(){
	//game.state.start('gamePlay');
}



var gamePlay={
	preload:function(){
		game.load.image('sky', 'assets/sky.png');
	    game.load.image('ground', 'assets/platform.png');
	    game.load.image('star', 'assets/star.png');
	    game.load.image('startButton','assets/button1.png');
	    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

	    game.load.audio('jump','sons/Jump.wav');
	 	game.load.audio('coin','sons/Coin.wav');
	 	game.load.audio('music','sons/Music.wav');

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
		sec =0;
		min =0;
    	hr =0;
		
		isGame = false;

		if(isGame){ min = 500;}
		//Chao
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.add.sprite(0,0,'sky');

		platforms = game.add.group();
		platforms.enableBody = true;

		var ground = platforms.create(0,game.world.height - 64, 'ground');
		ground.scale.setTo(2,2);
		ground.body.immovable = true;

	//Plataformas

		var ledge = platforms.create(400,400,'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(-150,250,'ground');
		ledge.body.immovable = true;

	//Player

		
		player = game.add.sprite(32,game.world.height - 150 ,'dude');

		game.physics.arcade.enable(player);

		player.body.bounce.y = 0,2;
		player.body.gravity.y = 300;
		player.body.collideWorldBounds = true;

		player.animations.add('left',[0,1,2,3],10,true);
		player.animations.add('right',[5,6,7,8],10,true);

		cursors =game.input.keyboard.createCursorKeys();

	//Stars
		stars = game.add.group();
		stars.enableBody = true;

		for(var i =0 ; i<12;i++){
			var star = stars.create(i* 70 , 0 , 'star');
			
			star.body.gravity.y = 6;

			star.body.bounce.y = 0.7 + Math.random() * 0.2;
		}
	//Score
		score =0;
		scoreText= game.add.text(16,16,'score: 0',{fontSize: '32px',fill:'#000'});

	//Sons
		jumpSound= game.add.audio('jump');
		coinSound = game.add.audio('coin');
		musicSound = game.add.audio('music');

		musicSound.loopFull(0.6);


		//button = game.add.button(game.world.centerX -40, 400,'startButton',actionOnClick,this,2,1,0);

		timer = game.time.create(false);
		timer.loop(2000,updateCounter,this);
		timer.start();

		timeTxt= game.add.text(650,16,'0:00',{fontSize: '32px',fill:'#000'});

		isGame = true;


	},
	update:function(){
		game.physics.arcade.collide(player,platforms);

//walk and Jump
	player.body.velocity.x = 0;

	if(cursors.left.isDown){
		player.body.velocity.x = -150;
		player.animations.play('left');
	}else if(cursors.right.isDown){
		player.body.velocity.x = 150;
		player.animations.play('right');
	}else{
		player.animations.stop();
		player.frame = 4;
	}

	if(cursors.up.isDown && player.body.touching.down){
		jumpSound.play();
		player.body.velocity.y = -350;
		
	}

	game.physics.arcade.collide(stars,platforms);
	game.physics.arcade.overlap(player,stars,collectStar,null,this);

	},
	collectStar:function(){
		star.kill();
		coinSound.play();
		score +=10;
		scoreText.text = 'Score: '+ score;
	},
	updateCounter:function(){
		sec ++;
		if(sec === 60){min++; sec =0 ;}
		if(sec<10){timeTxt.text = +min +':0'+sec;}else{timeTxt.text = +min +':'+sec;}
	}
}




