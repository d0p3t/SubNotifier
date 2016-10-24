var config = {};

config.tmi = {
    options: {
        clientId: 'add your clientId here',
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: 'your username',
        password: 'your oauth key'
    },
    channels: ["the channel"]
};

module.exports = config;
