

	// Messages

	var Commands = 'Available commands: !help !commands !spawn !stop !move !sleep';
	var Help = 'Talk in chat or use !spawn command, to spawn your avatar! Control your avatar with commands! Your avatar will have your chat user name color!';


	// Join channel

	var botUserName;

	TAPIC.setup(oauth, function (user) {

		TAPIC.setRefreshRate(1000);

		TAPIC.joinChannel(channel);

		botUserName = user;
		
	});

	
	// Event listeners

	TAPIC.listen('join', function (e) {
		
		if (e !== botUserName) {
			if (e === channel) {
				var data = {name: e, color: 'red'};
			} else {
				var data = {name: e, color: '#000000'};
			}
			spawnEgg(data);
		}
		
	});

	// User leave chat
	
	TAPIC.listen('part', function (e) {
		
		var data = {name: e};
		despawnAvatar(data);
		
	});

	// User is hosting
	
	TAPIC.listen('host', function (e) {
		
		console.log( e + ' is hosting you.' );
		
	});
	
	// User followed

	TAPIC.listen('follow', function (e) {
		
		console.log( e + ' has followed you.' );
		
	});
	
	// User subbed

	TAPIC.listen('sub', function (e) {
		
		console.log( e + ' has just subscribed!' );
		
	});
	
	// User resubbed

	TAPIC.listen('subMonths', function (e) {
		
		console.log( e.name + ' has resubbed ' + e.months + ' times!' );
		
	});
	
	// User subbed offline

	TAPIC.listen('subsAway', function (e) {
		
		console.log( e + ' users have subbed since you have been offline.' );
		
	});
	
	// User send messgae in chat

	TAPIC.listen('message', function (e) {

		var data = {name: e.from.toLowerCase(), color: e.color};

		switch (e.text) {
			
			case '!commands':
				TAPIC.sendChat(Commands);
				break;
				
			case '!help':
				TAPIC.sendChat(Help);
				break;
				
			case '!stop':
				stopAvatar(data);
				break;
				
			case '!move':
				moveAvatar(data);
				break;
				
			case '!sleep':
				sleepAvatar(data);
				break;
				
			case '!spawn':
				spawnAvatar(data);
				
			default:
				spawnAvatar(data);
		}
		
	});
	
	// User send whisper message in chat

	TAPIC.listen('whisper', function (e) {
		
		if (e.from.toLowerCase() === channel) {
			TAPIC.sendChat('/me ' + e.text);
		} else {
			console.info(e);
		}
		
	});
	
	// Api data has been updated

	TAPIC.listen('update', function () {
		
		TAPIC.sendChat(Help +' '+ Commands);
		
	});
