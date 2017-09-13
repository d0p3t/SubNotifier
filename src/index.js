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

import { TwitchBot } from './lib/TwitchBot';
import { Config } from './config/config';

const bot = new TwitchBot(
  Config.clientId,
  Config.username,
  Config.token,
  Config.channels);

bot.Start();

if (Config.enableSubAlerts) {
  bot.SubAlert();
}

if (Config.enableResubAlerts) {
  bot.ResubAlert();
}

if (Config.enableBitAlerts) {
  bot.BitAlert();
}
