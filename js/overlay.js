

// SETUP FUNCTIONS

var debug = false;

var users = new Array();

function Avatar (data) {

	this.x = data.x;
	this.y = data.y;
	this.minSpeed = -30;
	this.maxSpeed = 30;
	this.vx = Math.random() * (this.maxSpeed - this.minSpeed + 1) - this.minSpeed;
	this.vy = Math.random() * (this.maxSpeed - this.minSpeed + 1) - this.minSpeed;

	this.color = data.color;
	this.name = data.name;
	this.orientation = 'right';

	this.avatar = game.add.sprite(this.x, this.y, 'LabBugLurker');

	game.physics.arcade.enable(this.avatar);
	this.avatar.enableBody = true;
	this.avatar.body.collideWorldBounds = true;
	this.avatar.body.immovable = false;
	this.avatar.body.bounce.setTo(1, 1);
	this.avatar.body.velocity.x = this.vx;
	this.avatar.body.velocity.y = this.vy;
	this.avatar.body.onCollide = new Phaser.Signal();
	this.avatar.body.onCollide.add(function(){console.log('bang')}, this);

	this.avatar.anchor.setTo(0.5, 0.5);
	this.avatar.scale.set(4);
	this.avatar.alpha = 0;
	this.avatar.animations.add('walk-left', [0,1,2,3], 10, true);
	this.avatar.animations.add('walk-right', [4,5,6,7], 10, true);
	this.avatar.animations.add('idle-right', [8,9,10,11], 10, true);
	this.avatar.animations.add('idle-left', [12,13,14,15], 10, true);
	this.avatar.animations.add('sleep-left', [16,17,18,19], 10, true);
	this.avatar.animations.add('sleep-right', [20,21,22,23], 10, true);
	this.avatar.animations.play('walk-right');

	this.avatar.blendMode = PIXI.blendModes.OVERLAY;

	this.avatar.tint = '0x' + this.color.substr(1);

	this.avatar.inputEnabled = true;
	this.avatar.input.enableDrag();

	this.avatar.events.onDragStart.add(function(){
		this.avatar.body.moves = false;
	}, this);

	this.avatar.events.onDragStop.add(function(){
		this.avatar.body.moves = true;
	}, this);

	this.label = game.add.text(0, 0, data.name, { font: '10px Arial', fill: data.color });
	this.label.anchor.setTo(0.5, 1.2);
	this.label.alpha = 0;
	this.avatar.addChild(this.label);
	
}

Avatar.prototype.destroy = function() {
	
	this.label.destroy();
	this.avatar.destroy();
	
}

var game = new Phaser.Game('100', '100', Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render }, true, false);


// MAIN FUNCTIONS

function preload() {
	
	game.load.spritesheet('LabBugLurker', 'assets/sprites/LabBugLurker.png', 16, 16, 24);

}

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

}

function update() {

	Object.keys(users).forEach(function(item) {

		if (users[item].avatar.position < users[item].avatar.previousPosition && users[item].orientation != 'left') {

			users[item].avatar.animations.play('walk-left');
			users[item].orientation = 'left';

		} else if (users[item].avatar.position > users[item].avatar.previousPosition && users[item].orientation != 'right') {

			users[item].avatar.animations.play('walk-right');
			users[item].orientation = 'right';

		}

	});

}

function render() {

	if (debug) {
		
		debugScreen();
		
	}

}


// CUSTOM FUNCTIONS

function spawnAvatar(data) {

	if (typeof users[data.name] === 'undefined') {
		
		users[data.name] = new Avatar(data);
		game.add.tween(users[data.name].avatar).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
		game.add.tween(users[data.name].label).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true, 0, 0, true);
		
	}
	
}

function stopAvatar(data) {

	if (typeof users[data.name] !== 'undefined') {
		
		users[data.name].vx = users[data.name].avatar.body.velocity.x;
		users[data.name].vy = users[data.name].avatar.body.velocity.y;
		users[data.name].avatar.body.velocity.x = 0;
		users[data.name].avatar.body.velocity.y = 0;
		users[data.name].avatar.animations.play('idle-' + users[data.name].orientation);
		
	}
	
}

function sleepAvatar(data) {

	if (typeof users[data.name] !== 'undefined') {
		
		users[data.name].vx = users[data.name].avatar.body.velocity.x;
		users[data.name].vy = users[data.name].avatar.body.velocity.y;
		users[data.name].avatar.body.velocity.x = 0;
		users[data.name].avatar.body.velocity.y = 0;
		users[data.name].avatar.animations.play('sleep-' + users[data.name].orientation);
		
	}
	
}

function moveAvatar(data) {

	if (typeof users[data.name] !== 'undefined') {
		
		users[data.name].avatar.body.velocity.x = users[data.name].vx;
		users[data.name].avatar.body.velocity.y = users[data.name].vy;
		users[data.name].avatar.animations.play('walk-' + users[data.name].orientation);
		
	}
	
}

function despawnAvatar(data) {

	if (typeof users[data.name] !== 'undefined') {
		
		game.add.tween(users[data.name].avatar).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true, 0, 0, false);
		game.add.tween(users[data.name].label).to( { alpha: 0 }, 5000, Phaser.Easing.Linear.None, true, 0, 0, true);

		users[data.name].destroy();
		delete users[data.name];
		
	}

}

function debugScreen() {

	var x = 32;
	var y = 0;
	var yi = 32;

	game.debug.text('Viewport', x, y += yi);

	game.debug.text('Viewport Width: ' + game.scale.viewportWidth, x, y += yi);
	game.debug.text('window.innerWidth: ' + window.innerWidth, x, y += yi);
	game.debug.text('window.outerWidth: ' + window.outerWidth, x, y += yi);

	game.debug.text('Viewport Height: ' + game.scale.viewportHeight, x, y += yi);
	game.debug.text('window.innerHeight: ' + window.innerHeight, x, y += yi);
	game.debug.text('window.outerHeight: ' + window.outerHeight, x, y += yi);

	game.debug.text('Document', x, y += yi*2);

	game.debug.text('Document Width: ' + game.scale.documentWidth, x, y += yi);
	game.debug.text('Document Height: ' + game.scale.documentHeight, x, y += yi);

	game.debug.inputInfo(x, y += yi);

	x = 350;
	y = 0;

	game.debug.text('Device', x, y += yi);

	game.debug.text('window.screen.width: ' + window.screen.width, x, y += yi);
	game.debug.text('window.screen.availWidth: ' + window.screen.availWidth, x, y += yi);
	game.debug.text('window.screen.height: ' + window.screen.height, x, y += yi);
	game.debug.text('window.screen.availHeight: ' + window.screen.availHeight, x, y += yi);

	game.debug.text('Navigator: ' + navigator.userAgent, x, y += yi);
	game.debug.text('iOS: ' + game.device.iOS, x, y += yi);
	game.debug.text('Mobile Safari: ' + game.device.mobileSafari, x, y += yi);
	game.debug.text('WebApp: ' + game.device.webApp, x, y += yi);
	game.debug.text('nav: ' + navigator['standalone'], x, y += yi);
	game.debug.text('app: ' + game.device.iOSVersion, x, y += yi);

}
