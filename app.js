var tmi = require('tmi.js');
var winston = require('winston');
var config = require('./config.js');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
				level: 'debug'
			}),
      new (winston.transports.File)({
				level: 'info',
				filename: 'logfile.log'
			})
    ]
  });

var client = new tmi.client(config.tmi);
client.connect();

client.on("connected", function(address, port) {
	logger.debug("Successfully connected to " + config.tmi.channels);
	logger.debug("Listening for Twitch subs and resubs...");
});

client.on("disconnected", function(reason) {
	logger.debug("Disconnected for " + reason);
});

client.on("subscription", function (channel, username, method, message, userstate) {
	logger.info("Subscription [username=" + username + "] for [channel=" + channel + "] [prime=" + method.prime + "] [plan=" + method.plan + "]");
	if (method.prime === true) {
		if(message === null)
			client.say(channel, "PogChamp SUB HYPE PogChamp " + username + " just subscribed with Twitch Prime!!!");
		else
		  client.say(channel, "PogChamp SUB HYPE PogChamp " + username + " just subscribed with Twitch Prime!!! ('" + message + "')");
	}
	else {
		if(message === null)
			client.say(channel, "PogChamp SUB HYPE PogChamp " + username + " just subscribed!!!");
		else
		  client.say(channel, "PogChamp SUB HYPE PogChamp " + username + " just subscribed!!! ('" + message + "')");
	}

});

client.on("resub", function (channel, username, months, message, userstate, methods) {
	logger.info("Resub [username=" + username + "] for [channel=" + channel + "] [months=" + months + "] [prime=" + methods.prime + "] [plan=" + methods.plan + "]");
	if (methods.prime === true) {
		if(message === null)
			client.say(channel, "PogChamp RESUB HYPE PogChamp " + username + " has just re-subscribed for " + months + " months using Twitch Prime!!!");
		else
			client.say(channel, "PogChamp RESUB HYPE PogChamp " + username + " has just re-subscribed for " + months + " months using Twitch Prime!!! ('" + message + "')");
	}
	else {
		if(message === null)
			client.say(channel, "PogChamp RESUB HYPE PogChamp " + username + " has just re-subscribed for " + months + " months using Twitch Prime!!!");
		else
			client.say(channel, "PogChamp RESUB HYPE PogChamp " + username + " has just re-subscribed for " + months + " months using Twitch Prime!!! ('" + message + "')");
	}
});
