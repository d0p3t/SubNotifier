<div align="center">

# SubNotifier (v1.0.7)

<img src="http://i.imgur.com/gZkK7Yu.png" width="200px" height="200px">

##### A Simple Sub and Resub Notifier for Twitch Chat

![Version](https://img.shields.io/badge/version-1.0.7-green.svg) [![Discord](https://img.shields.io/discord/330910293934997504.svg)](https://discord.gg/bSd4cYJ) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

### Want to use SubNotifier but need a Host? Follow + Tweet me [@d0p3t](https://twitter.com/d0p3t)

</div>

## Features

- Chat alerts on subscriptions, subscription gifting and resubscriptions
- Chat alerts on bits cheered including custom thresholds (i.e. 5000 bits)
- Add your own custom alert messages for every channel and chat alert
- Easy configuration with ability to enable/disable features
- Multi channel support
- Logfile to track subscriptions, gifted subscriptions, resubscriptions and bits chat alerts

---

## Screenshot

<div align="center">

![Alert](https://pbs.twimg.com/media/DJZXK-SXoAEVw2_.jpg)

</div>

---

## Quickstart

1. Install [NodeJS](https://nodejs.org/en/download/)
2. Clone or download the repository
3. Open a terminal window and navigate to the directory
4. Install dependencies `npm install`
5. Edit `src/config/config.sample.js` and rename to `config.js`

(**HIGHLY RECOMMENDED**) Build and run the application in _**Production Mode**_

- Build `npm run build` then `npm run serve`

If you are a developer or want to debug go into _**Development Mode**_

- Set `process.env.NODE_ENV = "development"`
- Start `npm start`

---

## Configuration

A configuration file can be found in `./src/config/config.sample.js`. Configure all settings as you desire and rename the file to `config.js`. If you are running in the production environment you will have to rebuild with `npm run build` everytime you change something in the configuration file.

### Connecting to Twitch Chat

To be able to connect to Twitch chat, you have to register an application and get an OAuth token with the correct scopes. You will also have to specify at least one channel. Please keep in mind that you need custom alerts for each channel if you have `enableCustomMessages: true`.

- Register an application on Twitch [here](https://dev.twitch.tv/dashboard/apps/create) and copy the clientId
- Login to the Twitch account to be used and get an [OAuth token](https://twitchapps.com/tmi/)

```javascript
clientId: 'xxxxxxxxxxxxxxxx',
username: 'd0p3tbot',
token: 'xxxxxxxxxxxxxxxxx',
channels: ['#d0p3t', '#summit1g', '#ninja'],
```

### Configure Chat Messages

There are three types of chat notifiers, we call them Chat Alerts.

- subscriptions
- resubscriptions
- bits

You can use as many custom chat alerts as you wish. If you activate custom chat alerts, you **MUST** set at least 1 custom chat alert per type and channel. If custom alerts are not enabled, it will default to predefined messages.

Within the chat alerts you can use various variables. Below is a list of available variables with a description and where you can use them.

| Variable      | Description                                                            | Uses                                                 |
| ------------- | ---------------------------------------------------------------------- | ---------------------------------------------------- |
| {{username}}  | Displays the username of the (re)subscriber/cheerer                    | subscriptions, resubscriptions, bits, bitsThresholds |
| {{months}}    | Number of months resubscribed                                          | resubscriptions                                      |
| {{years}}     | Displays # years if 1 year or more (as `[ X year(s) and X month(s) ]`) | resubscriptions                                      |
| {{bits}}      | Amount of bits cheered                                                 | bits                                                 |
| {{message}}   | Message sent with event                                                | subscriptions, resubscriptions, bits, bitsThresholds |
| {{recipient}} | Recipient of a gifted subscription                                     | giftsubscriptions                                    |

```javascript
'#d0p3t': {
  subscriptions: {
    custom1: 'PogChamp SUB Thank you for subscribing {{username}}',
    custom2: 'CoolStoryBob SUB Thank you for subscribing {{username}}',
    custom3: 'DansGame SUB Thank you for subscribing {{username}}' },
  giftsubscriptions: {
    custom1: 'PogChamp SUB Thank you for gifting {{recipient}} a subscription, {{username}}',
    custom2: 'CoolStoryBob SUB Thank you for gifting {{recipient}} a subscription, {{username}}',
    custom3: 'DansGame SUB Thank you for gifting {{recipient}} a subscription, {{username}}' },
  resubscriptions: {
    custom1: 'PogChamp RESUB Thank you {{username}} for resubscribing for {{months}} months! {{years}} {{message}}',
    custom2: 'WutFace RESUB Thank you {{username}} for resubscribing for {{months}} months! {{years}}',
    custom3: '<3 RESUB Thank you {{username}} for resubscribing for {{months}} months! {{years}}' },
  bits: {
    custom1: 'Wowzers, {{username}} cheered {{bits}} BITS!',
    custom2: 'Oh so kind, {{username}} with the {{bits}} BITS!',
    custom3: 'LUL we got a happy cheerer over here ({{username}}: {{bits}} bits)!' },
    bitsThresholds: {
      1000: '1000 BITS from {{username}} with the message {{message}}!',
      5000: '{{username}} just sent 5000 BITS our way! What an amazing person',
      10000: 'This is insane, 10000 BITS from {{username}}!',
      25000: '25000 BITS! I don\'t know what to say, {{username}}',
      50000: '50000 BITS from {{username}} and they said: {{message}}!',
      75000: '75000 BITS cheers by the gracious {{username}}!',
      100000: 'What does heaven feel like? Right, 100000 BITS from {{username}}!',
    },
},
```

### Enable/Disable Features

There also various settings that you can enable (true) or disable (false).

| Setting              | Description                                  | Default |
| -------------------- | -------------------------------------------- | ------- |
| enableSecureMode     | Connects to Twitch chat with SSL (443)       | true    |
| enableMeMode         | Chat alerts start with _/me_                 | true    |
| enableSubAlerts      | Enables subscription chat notifications      | true    |
| enableGiftSubAlerts  | Enabled gift subscription chat notifications | true    |
| enableResubAlerts    | Enables resubscriptions chat notifications   | true    |
| enableBitAlerts      | Enables bits chat notifcations               | false   |
| enableCustomMessages | Enables custom chat alerts                   | true    |

If you've configured everything correctly, you will now be able to start _SubNotifier_ and upon a successful connection will see `CONNECTED: Waiting for events...`. If you are still having issues, please refer to the sample configuration file first and then open an issue (see below).

---

## Issues

If you have any issues or questions, open an issue or tweet me [@d0p3t](https://twitter.com/d0p3t).

For configuration file problems, please first check whether your syntax is correct and you aren't missing any commas or brackets. SubNotifier has a failsafe against missing custom messages, but will not revert to the defaults if `enableCustomMessages: true` and there is a problem with the configuration file.

---

## Thank You!

Thank you to the creators and maintainers of [twitch-js](https://github.com/twitch-apis/twitch-js) for providing easy access to TwitchNotify events and Twitch Chat.

Also a great thank you to [Ikatzuki](https://twitter.com/lolIkatzuki) and [dinu](https://twitter.com/dinuDB) for discussing and coming up with new features. Without you SubNotifier wouldn't have improved as it did now.

![bitmoji](https://render.bitstrips.com/v2/cpanel/10219133-189398152_3-s4-v1.png?transparent=1&palette=1&width=246)

---

## Changelog

v1.0.7 (01 February 2019)

- Upgraded dependencies
- Modified debug mode. Enable now via `process.env.NODE_ENV = "development"`
- Fixed logger for winston v3
- Changed to daily logging w/ 14 days retention

v1.0.6 (04 September 2018)

- Added `bitThresholds` allowing for custom message for a custom bit amount. Thanks to [6mas](https://twitter.com/MR6MAS) for the suggestion in [i15] . If there are bugs, please let me know as I'm unable to test this.
- Upgraded [twitch-js](https://github.com/twitch-apis/twitch-js) to v1.2.14

v1.0.5 (10 July 2018)

- Added `message` variable support to resubscriptions
- Added reconnecting and reconnected messages for clarity
- Fixed linting errors (1 remaining due to twitch-js constructor)

v1.0.4 (20 June 2018)

- Fixed security vulnerabilities
- Upgraded `package.json`
- Fix gift subscription messages not populating correctly

v1.0.3 (16 March 2018)

- Added gift subscription alerts
- Switched to twitch-js, a more up-to-date version of tmi.js

v1.0.2 (18 September 2017)

- Fixed custom message counter
- Added check whether there is more than 1 custom message in a alert type
- Fixed `README.md` and `package.json` versioning

v1.0.1 (17 September 2017)

- Fixed - Better handling of # of custom messages
- Added `prettyPrint: true` to `Logger.js` for better console output
- Added more debug messages
- Added the `{{message}}` variable

v1.0.0 (13 September 2017)

- Complete rewrite of codebase (ECMASCRIPT 6)
- Now supports bits
- Separation of custom messages
- Multi channel support
- New configuration file

v0.2.0

- Got rid of `message` in default subscription notify due to TwitchNotify changes
- Fixed `message` sometimes displaying as `null` during resub
- Added logfile creation with information about sub/resub
- Updated tmi.js to v1.2.1
- Added support for newest TwitchNotify events
- Added separate announcement for Prime subscriptions
- Disabled debug by default

v0.1.0

- Initial release
