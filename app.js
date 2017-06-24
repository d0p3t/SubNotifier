var tmi = require('tmi.js');
var config = require('./config.js');

var client = new tmi.client(config.tmi);
client.connect();


client.on("subscription", function (channel, username, method, message, userstate) {
	if (method.prime === true) {
		console.log("Prime Sub");
		client.say(channel, "PogChamp " + username + " just subscribed with Twitch Prime!!! (" + message + ")");
	}
	else {
		console.log("Normal Sub");
		client.say(channel, "PogChamp " + username + " just subscribed!!! (" + message + ")");
	}

});

client.on("resub", function (channel, username, months, message, userstate, methods) {
	if (methods.prime === true) {
		console.log("Resub prime");
		client.say(channel, "PogChamp RESUB HYPE PogChamp " + username + " has just re-subscribed for " + months + " months using Twitch Prime!!! (" + message + ")");
	}
	else {
		console.log("Normal Sub");
		client.say(channel, "PogChamp RESUB HYPE PogChamp " + username + " has just re-subscribed for " + months + " months!!! (" + message + ")");	
	}
});

