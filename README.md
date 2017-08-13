# SubNotifier
Simple Sub and Resub notifier for Twitch chat

**Currently used in d0p3tbot, a bot for Twitch chat. Check it out [here](https://github.com/d0p3t/d0p3tbot)!**

Questions? Open an issue or tweet [@d0p3t](https://twitter.com/d0p3t)



## Changelog
v0.2.1
* Got rid of `message` in default subscription notify due to TwitchNotify changes
* Fixed `message` sometimes displaying as `null` during resub
* Added logfile creation with information about sub/resub

v0.2.0
* Updated tmi.js to v1.2.1
* Added support for newest TwitchNotify events
* Added separate announcement for Prime subscriptions
* Disabled debug by default

v0.1.0
* Initial release

## Requirements
1. [NodeJS](https://nodejs.org/en/download/)
2. NPM (comes with NodeJS)

## Installation
1. Clone or download the repository
2. Open Terminal and go to directory
3. Install dependencies `npm install`
4. Edit `config.js`
5. (optional) Edit messages in `app.js`

## Usage
1. Run application `node app.js` in terminal

* Show chat? Set `debug: true` in `config.js`.  
* Create your own custom messages? Edit `app.js`
