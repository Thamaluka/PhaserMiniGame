Game.Level1 = function(game){};

  		

Game.Level1.prototype ={
	create:function(){

		countStars =0;
		sec =0;
		min =0;
    	hr =0;
		
		isGame = false;

		if(isGame){ min = 500;}
	//Chao
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.add.sprite(0,0,'sky');

		platforms = this.add.group();
		platforms.enableBody = true;

		var ground = platforms.create(0,this.world.height - 64, 'ground');
		ground.scale.setTo(2,2);
		ground.body.immovable = true;

	//Plataformas

		var ledge = platforms.create(400,400,'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(-150,250,'ground');
		ledge.body.immovable = true;

	//Player

		
		player = this.add.sprite(32,this.world.height - 150 ,'dude');

		this.physics.arcade.enable(player);

		player.body.bounce.y = 0,2;
		player.body.gravity.y = 300;
		player.body.collideWorldBounds = true;

		player.animations.add('left',[0,1,2,3],10,true);
		player.animations.add('right',[5,6,7,8],10,true);

		cursors =this.input.keyboard.createCursorKeys();

	//Stars
		stars= this.add.group();
		stars.enableBody = true;

		for(var i =0 ; i<12;i++){
			star = stars.create(i* 70 , 0 , 'star');
			
			star.body.gravity.y = 6;

			star.body.bounce.y = 0.7 + Math.random() * 0.2;
		}
	//Score
		score =0;
		scoreText= this.add.text(16,16,'score: 0',{fontSize: '32px',fill:'#000'});

	//Sons
		jumpSound= this.add.audio('jump');
		coinSound = this.add.audio('coin');
		musicSound = this.add.audio('music');
		winSound =this.add.audio('win');

		musicSound.loopFull(0.6);


	//Timer

		timer = this.time.create(false);
		timer.loop(2000,updateCounter,this);
		timer.start();

		timeTxt= this.add.text(650,16,'0:00',{fontSize: '32px',fill:'#000'});

		isGame = true;


	},
	update:function(){
		this.physics.arcade.collide(player,platforms);

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

	this.physics.arcade.collide(stars,platforms);
	this.physics.arcade.overlap(player,stars,collectStar,null,this);

	if(countStars == 12){
		winSound.play();
		this.state.start('Win');
		musicSound.destroy();
	}

	}
}

function updateCounter(){
		sec ++;
		if(sec === 60){min++; sec =0 ;}
		if(sec<10){timeTxt.text = +min +':0'+sec;}else{timeTxt.text = +min +':'+sec;}
}

function collectStar(player, star){
		star.kill();
		coinSound.play();
		score +=10;
		scoreText.text = 'Score: '+ score;
		countStars++;

}




