/**
 * Copyright (c) 2017 REMCO TROOST <d0p3t89@gmail.com>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import tmi from 'tmi.js';

import { Logger } from './Logger';
import { RandomNumber } from './Helpers';
import { Config } from '../config/config';

/**
 * Class of TwitchBot
 * @type {[class]}
 */
class TwitchBot {
  /**
   * [Instantiates the TwitchBot with tmi.js options]
   *
   * @param {[String]} clientId [Id of a registered application at Twitch]
   * @param {[String]} username [Username of the bot to be logged in]
   * @param {[String]} token [Oauth token with correct scopes]
   * @param {[Array]} channels [An array of channels to connect to]
   * @return {[none]} [description]
   */
  constructor(clientId, username, token, channels) {
    this._clientId = clientId;
    this._username = username;
    this._token = token;
    this._channels = channels;
  }

  /**
   * [Start description]
   * @return {[none]} [description]
   */
  Start() {
    Logger.info('STARTING SubNotifier...');

    if (Config.enableDebug) {
      Logger.transports.console.level = 'debug';
    }

    this._options = {
      options: {
        clientId: this._clientId,
        debug: Config.enableDebug,
      },
      connection: {
        reconnect: true,
        maxReconnectAttempts: 120,
        secure: Config.enableSecureMode,
      },
      identity: {
        username: this._username,
        password: this._token,
      },
      channels: this._channels,
    };

    this._client = new tmi.client(this._options);

    if (Config.enableCustomMessages) {
      Logger.debug('COUNTING Custom Messages...');

      this._messagesCount = [];

      for (let i = 0; i < this._channels.length; i += 1) {
        const channel = this._channels[i];
        this._messagesCount.push({ channel: channel });
        const allMsgs = Object.getOwnPropertyNames(Config.customMessages[channel]);
        this._messagesCount[channel] = { subscriptions: 0, resubscriptions: 0, bits: 0 };
        for (const type of allMsgs) {
          const messagesOfThisType = Config.customMessages[channel][type];
          for (let message in messagesOfThisType) {
            if (messagesOfThisType.hasOwnProperty(message)) {
              ++this._messagesCount[channel][`${type}`];
              Logger.debug(`FOUND [ ${type} ] message for channel [ ${channel} ]`);
            }
          }
          if (this._messagesCount[type] < 1) {
            Logger.error(`You MUST have at least 1 custom message for ${type} in channel [ ${channel} ]!`);
            process.exit(1);
          } else {
            Logger.debug(`COUNTED ${this._messagesCount[channel][type]} ${type} messages for channel [ ${channel} ]`);
          }
        }
        Logger.debug(`TOTAL MESSAGES IN CHANNEL [ ${channel} ] :`);
        Logger.debug(JSON.stringify(this._messagesCount[channel]));
      }

      Logger.info('ENABLED Custom Messages!');
    }

    this._client.connect()
      .then((data) => {
        Logger.debug(`CONNECTED to chat on ${data[0]}:${data[1]}`);
        Logger.info('CONNECTED: Waiting for events...');
      })
      .catch((err) => {
        Logger.error(`ERROR Could not connect to chat (${err})`);
      });

    this._client.on('disconnected', (reason) => {
      Logger.warn(`DISCONNECTED from chat, trying to reconnect... (reason: ${reason})`);
    });
  }

  /**
   *  Method to Disconnect from the Twitch API and Chat
   * @return {[none]} [description]
   */
  Stop() {
    this._client.disconnect()
      .then((data) => {
        Logger.info(`DISCONNECTED from ${data.server}:${data.port}`);
      })
      .catch((err) => {
        Logger.error(`ERROR Could not disconnect (${err})`);
      });
  }

  /**
   * [SubAlert description]
   * @return {[none]} [description]
   */
  SubAlert() {
    this._client.on('subscription', (channel, username, method, message, userstate) => {
      if (Config.enableCustomMessages) {
        const subAlertMessages = Config.customMessages[channel].subscriptions;
        if (subAlertMessages !== undefined) {
          let rand = 1;
          if (this._messagesCount.subscriptions !== 1) {
            rand = RandomNumber(1, this._messagesCount[channel].subscriptions);
          }
          const alert = subAlertMessages[`custom${rand}`];
          let finalAlert = alert.replace(/{{username}}/gi, username);
          finalAlert = finalAlert.replace(/{{message}}/gi, message);
          if (Config.enableMeMode) {
            this._client.action(channel, finalAlert)
              .then((data) => {
                Logger.debug(`SUBALERT was sent to channel: ${data[0]} for username: ${username}`);
              })
              .catch((err) => {
                Logger.error(`SUBALERT could not be sent (ERROR ${err})`);
              });
          } else {
            this._client.say(channel, finalAlert)
              .then((data) => {
                Logger.info(`SUBALERT was sent to channel: ${data[0]} for username: ${username}`);
              })
              .catch((err) => {
                Logger.error(`SUBALERT could not be sent (ERROR ${err})`);
              });
          }
        } else {
          Logger.warn(`No custom SUB messages found for channel: ${channel}! Please check your configuration.`);
        }
      } else if (Config.enableMeMode) {
        this._client.action(channel, `<3 NEW SUB Thank you ${username} for subscribing! <3 <3 <3`)
          .then((data) => {
            Logger.info(`SUBALERT was sent to channel: ${data[0]} for username: ${username}`);
          })
          .catch((err) => {
            Logger.error(`SUBALERT could not be sent (ERROR ${err})`);
          });
      } else {
        this._client.say(channel, `<3 NEW SUB Thank you ${username} for subscribing! <3 <3 <3`)
          .then((data) => {
            Logger.info(`SUBALERT was sent to channel: ${data[0]} for username: ${username}`);
          })
          .catch((err) => {
            Logger.error(`SUBALERT could not be sent (ERROR ${err})`);
          });
      }
    });
  }

  /**
   * [ResubAlert description]
   * @return {[none]} [description]
   */
  ResubAlert() {
    this._client.on('resub', (channel, username, months, message, userstate, methods) => {
      if (Config.enableCustomMessages) {
        const resubAlertMessages = Config.customMessages[channel].resubscriptions;
        if (resubAlertMessages !== undefined) {
          let rand = 1;
          if (this._messagesCount.resubscriptions !== 1) {
            rand = RandomNumber(1, this._messagesCount[channel].resubscriptions);
          }
          const alert = resubAlertMessages[`custom${rand}`];
          const years = Math.floor(months / 12);
          const yearMonths = months % 12;
          let finalAlert = alert.replace(/{{username}}/gi, username);
          finalAlert = finalAlert.replace(/{{months}}/gi, months);
          if (years === 0) {
            finalAlert = finalAlert.replace(/{{years}}/gi, '');
          } else {
            finalAlert = finalAlert.replace(/{{years}}/gi, `[ ${years} year(s) and ${yearMonths} month(s) ]`);
          }
          if (Config.enableMeMode) {
            this._client.action(channel, finalAlert)
              .then((data) => {
                Logger.info(`RESUBALERT was sent to channel: ${data[0]} for username: ${username} [ ${months} months ]`);
              })
              .catch((err) => {
                Logger.error(`RESUBALERT could not be sent (ERROR ${err})`);
              });
          } else {
            this._client.say(channel, finalAlert)
              .then((data) => {
                Logger.info(`RESUBALERT was sent to channel: ${data[0]} for username: ${username} [ ${months} months ]`);
              })
              .catch((err) => {
                Logger.error(`RESUBALERT could not be sent (ERROR ${err})`);
              });
          }
        } else {
          Logger.warn(`No custom RESUB messages found for channel: ${channel}! Please check your configuration.`);
        }
      } else if (Config.enableMeMode) {
        this._client.action(channel, `<3 RESUB Thank you ${username} for resubscribing for ${months} months! <3 <3 <3`)
          .then((data) => {
            Logger.info(`RESUBALERT was sent to channel: ${data[0]} for username: ${username} [ ${months} months ]`);
          })
          .catch((err) => {
            Logger.error(`RESUBALERT could not be sent (ERROR ${err})`);
          });
      } else {
        this._client.say(channel, `<3 RESUB Thank you ${username} for resubscribing for ${months} months! <3 <3 <3`)
          .then((data) => {
            Logger.info(`RESUBALERT was sent to channel: ${data[0]} for username: ${username} [ ${months} months ]`);
          })
          .catch((err) => {
            Logger.error(`RESUBALERT could not be sent (ERROR ${err})`);
          });
      }
    });
  }

  /**
   * [BitAlert description]
   * @return {[none]} [description]
   */
  BitAlert() {
    this._client.on('cheer', (channel, userstate, message) => {
      if (Config.enableCustomMessages) {
        const bitAlertMessages = Config.customMessages[channel].bits;
        if (bitAlertMessages !== undefined) {
          let rand = 1;
          if (this._messagesCount.bits !== 1) {
            rand = RandomNumber(1, this._messagesCount[channel].bits);
          }
          const alert = bitAlertMessages[`custom${rand}`];
          let finalAlert = alert.replace(/{{username}}/gi, userstate.username);
          finalAlert = finalAlert.replace(/{{bits}}/gi, userstate.bits);
          finalAlert = finalAlert.replace(/{{message}}/gi, message);
          if (Config.enableMeMode) {
            this._client.action(channel, finalAlert)
              .then((data) => {
                Logger.info(`BITALERT was sent to channel: ${data[0]} for username: ${userstate.username} [ ${userstate.bits} bits ]`);
              })
              .catch((err) => {
                Logger.error(`BITALERT could not be sent (ERROR ${err})`);
              });
          } else {
            this._client.say(channel, finalAlert)
              .then((data) => {
                Logger.info(`BITALERT was sent to channel: ${data[0]} for username: ${userstate.username} [ ${userstate.bits} bits ]`);
              })
              .catch((err) => {
                Logger.error(`BITALERT could not be sent (ERROR ${err})`);
              });
          }
        } else {
          Logger.warn(`No custom BIT messages found for channel: ${channel}! Please check your configuration.`);
        }
      } else if (Config.enableMeMode) {
        this._client.action(channel, `FutureMan BITS Thank you ${userstate.username} for the ${userstate.bits} bits!`)
          .then((data) => {
            Logger.info(`BITALERT was sent to channel: ${data[0]} for username: ${userstate.username} [ ${userstate.bits} bits ]`);
          })
          .catch((err) => {
            Logger.error(`BITALERT could not be sent (ERROR ${err})`);
          });
      } else {
        this._client.say(channel, `FutureMan BITS Thank you ${userstate.username} for the ${userstate.bits} bits!`)
          .then((data) => {
            Logger.info(`BITALERT was sent to channel: ${data[0]} for username: ${userstate.username} [ ${userstate.bits} bits ]`);
          })
          .catch((err) => {
            Logger.error(`BITALERT could not be sent (ERROR ${err})`);
          });
      }
    });
  }
}

export { TwitchBot };
