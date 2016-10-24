var tmi = require('tmi.js');
var config = require('./config.js');

var client = new tmi.client(config.tmi);
client.connect();


client.on("subscription", function (channel, username, method) {

    client.say(channel, "ninjaHype " + username + " just subscribed!!!");

});

client.on("resub", function (channel, username, months, message) {

    client.say(channel, "ninjaHype" + username + " has just re-subscribed for " + months + " years!!!");

});

client.on("message", function (channel, userstate, message, self) {
    if (self) return;
    if(message.includes("d0p3t"))
    	client.say(channel, "Did I just hear someone say d0p3t?! OMG");
});

