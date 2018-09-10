# Twitch Avatar Bot Template

### This is starting point for your customized twitch avatar bot:

1. Download files, change oauth and channel name in **js/config.js**.
2. Download Tapic.js and Phaser CE libraries in to **js/libs** folder.
3. You will need your own avatar sprites with idle, walking and sleeping animations in each direction in **assets/sprites** folder.
   - You can find example sprite in png format with PyxelEdit source file in **assets/sprites** folder to see how it's made.
   - Check out Phaser docs to learn how to add your own custom sprites and animations.
   
4. All files must be hosted on a web server or localhost.
5. Set up OBS Browser Source component on the scene, with the address to the hosted **index.html** as a source.
   - You can also capture browser window with the bot running and add a chroma key to setup transparency.
   
6. Presto! Bot is running and waiting for commands and events on your channel!

---

Talk in chat or use !hatch command, to spawn your avatar.

Control your avatar with commands: !help !commands !hatch !stop !move !sleep

Your avatar will have your chat user name color.

Feel free to add your own commands and avatar stances!


This bot is using following libraries: 
- [Tapic.js](https://github.com/Skhmt/tapic) a Twitch API in javascript.
- [Phaser CE](https://github.com/photonstorm/phaser-ce) a javascript 2D game framework.

MIT License.
