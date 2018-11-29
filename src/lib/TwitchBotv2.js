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

import Twitch from 'twitch-js';
import { Config } from '../config/config';
import { Logger } from '../lib/Logger';

import SubAlert from '../modules/SubAlert';

/**
 * Class of TwitchBot
 * @type {[class]}
 */
class TwitchBot {
  /**
   * [Instantiates the TwitchBot with twitch-js options]
   * @param {[String]} clientId [Id of a registered application at Twitch]
   * @param {[String]} username [Username of the bot to be logged in]
   * @param {[String]} token [OAuth token with correct scopes]
   * @param {[Array]} channels [An array of channels to connect to]
   */
  constructor(clientId, username, token, channels) {
    this.clientId = clientId;
    this.username = username;
    this.token = token;
    this.channels = channels;
    this.options = {
      options: {
        clientId: this.clientId,
        debug: Config.enableDebug,
      },
      connection: {
        reconnect: true,
        maxReconnectAttempts: 120,
        secure: Config.enableSecureMode,
      },
      identity: {
        username: this.username,
        password: this.token,
      },
      channels: this.channels,
    };

    this.client = new Twitch.client(this.options);
    this.client.connect()
      .then((data) => {
        Logger.info(`CONNECTION ESTABLISHED on ${data[0]}:${data[1]}`);
      })
      .catch((err) => {
        Logger.error(`ERROR Could not connect to chat (${err})`);
      });
  }
}

export { TwitchBot };
