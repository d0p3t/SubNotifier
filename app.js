var tmi = require('tmi.js');
var config = require('./config.js');

var client = new tmi.client(config.tmi);
client.connect();


client.on("message", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;
    client.say(channel, "TwitchLit Eyyyyy has just subscribed to " + channel + "!!! TwitchLit");
});

client.on("subscription", function (channel, username, method) {
    // Do your stuff.

    client.say(channel, "TwitchLit " + username + " has just subscribed to " + channel + "!!! TwitchLit");
});

client.on("resub", function (channel, username, months, message) {
    // Do your stuff.

    client.say(channel, "TwitchLit " + username + " has just re-subscribed to " + channel + " for " + months +"!!! TwitchLit");
});