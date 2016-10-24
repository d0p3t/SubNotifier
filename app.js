var tmi = require('tmi.js');
var config = require('./config.js');

var client = new tmi.client(config.tmi);
client.connect();


client.on("subscription", function (channel, username, method) {

    client.say(channel, "TwitchLit " + username + " has just subscribed to " + channel + "!!! TwitchLit");

});

client.on("resub", function (channel, username, months, message) {

    client.say(channel, "TwitchLit " + username + " has just re-subscribed to " + channel + " for " + months +"!!! TwitchLit");
    
});