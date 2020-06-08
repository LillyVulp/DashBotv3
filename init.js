module.exports = {
	init: function () {
		global.lastRiskyAction = null;
		global.Discord = require("discord.js");
		global.pg = require("pg");
		global.database = new pg.Pool({
			connectionString: process.env.DATABASE_URL,
			ssl: true
		});
		(async () => {
			await database.connect().then(function(response) {
				console.log("Database connection established");
			}).catch(function(err) {
				console.log(err);
				console.log("Database connection failed, terminating...");
				process.exit(1);
			});
		})();
		global.fs = require("fs");
		global.jimplibrary = require("jimp");
		global.util = require("util");
		global.request = require("request");
		global.url = require("url");
		global.ytdl = require("ytdl-core");
		global.ytinfo = require("youtube-info");
		global.ytsearch = require("youtube-search");
		global.soundcloudInfo = require("soundcloud-lookup");
		global.bandcamp = require("node-bandcamp");
		global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		global.traceurl = require("trace-redirect").default;
		global.selfID = process.env.botID;
		global.ownerID = process.env.ownerID;
		global.dadJokeOdds = 0.5;
		global.musicQueue = [];
		global.serverDispatchers = [];
		global.repeatEnabled = [];
		global.lockdownOwners = [];
		global.lockdownTest = false;
		global.token = process.env.token;
		global.bot = new Discord.Client();
		global.commandList = [
			{category: "Music", description: "Commands for controlling the audio player", commands: [
				{command: "play [youtube/bandcamp/soundcloud url]", description: "Plays a youtube, bandcamp, or soundcloud song in VC"},
				{command: "pause", description: "Pause audio"},
				{command: "repeat", description: "Repeat a song"},
				{command: "resume", description: "Resume audio"},
				{command: "skip", description: "Skip a song"},
				{command: "queue", description: "Displays the song queue for the server"},
				{command: "bandcampsearch [query]", description: "Search bandcamp for a song"},
				{command: "youtubesearch [query]", description: "Search youtube for a song"}
			]},
			{category: "Reactions", description: "I react to your stupidity : D", commands: [
				{command: "boop [person]", description: "Boop a Snoot! :3"},
				{command: "bap [person]", description: "Bap someone! :french_bread:"},
				{command: "shootlasers", description: "Pew pew pew"},
				{command: "insult [person]", description: "Insult someone >:3"},
				{command: "say [phrase]", description: "Have the bot say something... snekkily"},
			]},
			{category: "Currency", description: "Become the richest person alive! In... ya know... a horribly inflated currency...", commands: [
				{command: "money", description: "Check how much money you have!"},
				{command: "earn", description: "Earn some more money! :3"},
			]},
			{category: "Images", description: "And YOU get an image, and YOU get an image!", commands: [
				{command: "cat", description: "Gives a random cat image :3c"},
				{command: "dog", description: "Gives a random dog image ▼・ᴥ・▼"},
				{command: "pfp [user]", description: "Get someone's profile picture, or your own! :3"},
				{command: "greyscale [image url]", description: "Turn an image to greyscale"},
				{command: "blur [image url] [intensity]", description: "Blur an image"}
			]},	
			{category: "Utilities", description: "Because sometimes, we actually have to do *useful* things", commands: [
				{command: "emotes", description: "Displays all emotes accessable by the bot"},
				{command: "userconfig [option]", description: "Toggle personal optional settings\nThe two optional settings are *dad*, which alters the state of dad jokes, and *someone*, which alters the state of @someone pings"},
				{command: "help [category/command (optional)]", description: "Displays information on a command or category. If none is specified, all categories are listed"},
				{command: "ping", description: "Pings the bot"},
			]},
			{category: "Moderation", description: "Please refer to section III, article VI of the bylaws", commands: [
				{command: "serverconfig [option]", description: "**Requires MANAGE_MESSAGES** Toggle optional settings for the server\nThe two optional settings are *dad*, which alters the state of dad jokes, and *someone*, which alters the state of @someone pings"},
				{command: "goaway", description: "**Requires KICK_MEMBERS** Make me leave your server... :c"},
				{command: "ban [user] [reason (optional)]", description: "**Requires BAN_MEMBERS** Banhammer ready, choose your target... >:3"},
				{command: "unban [user] [reason (optional)]", description: "**Requires BAN_MEMBERS** The gods have granted mercy on your soul... for now"},
				{command: "welcome [channel/text] [channel/text]", description: "**Requires MANAGE_MESSAGES** Configure the welcome message channel and the custom greeting\nUse <user> to mention the new user, and type two spaces to add a new line. Set the channel to `none` to disable"}
			]}
		];
	}
}
