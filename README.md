# Twitch Avatar Bot Template

This is starting point for your customized twitch avatar bot:

1. Download files, change oauth and channel name in config.js.
2. You will need your own avatar sprites with idle, walking and sleeping animations in each direction.
   (Check out Phaser docs to learn how to add your own custom sprites and animations.)
3. All files must be hosted on a web server or localhost.
4. Open your OBS Browser Source component on the scene and paste adress to the hosted index.html.
5. You can also capture browser window with a chroma key.
5. Presto! Bot is running!

Default command are !help !commands !stop !walk !sleep.
Feel free to add your own commands and avatar stances!

This bot is using following libraries: 
- [Tapic.js](https://github.com/Skhmt/tapic) a Twitch API in javascript.
- [Phaser CE](https://github.com/photonstorm/phaser-ce) a javascript 2D game framework.

MIT License.
