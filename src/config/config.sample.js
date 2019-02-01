/**
 * Copyright (c) 2019 REMCO TROOST <d0p3t89@gmail.com>
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

/**
 * Configuration file for SubNotifier. Please follow strict guidelines (see README)
 * Variables:
 *      {{username}} - The username of the person who subscribed/cheered
 *      {{months}} - Amount of months username has resubscribed for (ONLY resubscriptions!)
 *      {{years}} - If resubbed more than one year, will display '[ X year(s) and X month(s)]'
 *      {{bits}} - Amount of bits cheered (ONLY bits!)
 *      {{message}} - Message sent with the alert
 * @type {Object}
 */
const Config = {
  clientId: process.env.CLIENT_ID || '',
  username: process.env.USERNAME || '',
  token: process.env.TOKEN || '',
  channels: ['#d0p3t', '#channel2'],
  enableSecureMode: true,
  enableMeMode: true,
  enableSubAlerts: true,
  enableGiftSubAlerts: true,
  enableResubAlerts: true,
  enableBitAlerts: false,
  enableBitsThresholdMessages: true,
  enableCustomMessages: true,
  customMessages: {
    '#d0p3t': {
      subscriptions: {
        custom1: 'PogChamp SUB Thank you for subscribing {{username}}',
        custom2: 'CoolStoryBob SUB Thank you for subscribing {{username}}',
        custom3: 'DansGame SUB Thank you for subscribing {{username}}',
      },
      giftsubscriptions: {
        custom1:
          'PogChamp GIFTED SUB Thank you for gifting {{recipient}} a subscription, {{username}}',
        custom2:
          'CoolStoryBob GIFTED SUB Thank you for gifting {{recipient}} a subscription, {{username}}',
        custom3:
          'DansGame GIFTED SUB Thank you for gifting {{recipient}} a subscription, {{username}}',
      },
      resubscriptions: {
        custom1:
          'PogChamp RESUB Thank you {{username}} for resubscribing for {{months}} months! {{years}}',
        custom2:
          'WutFace RESUB Thank you {{username}} for resubscribing for {{months}} months! {{years}}',
        custom3:
          '<3 RESUB Thank you {{username}} for resubscribing for {{months}} months! {{years}}',
      },
      bits: {
        custom1: 'Wowzers, {{username}} cheered {{bits}} BITS!',
        custom2: 'Oh so kind, {{username}} with the {{bits}} BITS!',
        custom3:
          'LUL we got a happy cheerer over here ({{username}}: {{bits}} bits)!',
      },
      bitsThresholds: {
        1000: '1000 BITS from {{username}} with the message {{message}}!',
        5000: '5000 BITS!',
        10000: '10000 BITS!',
        25000: '25000 BITS!',
        50000: '50000 BITS!',
        75000: '75000 BITS!',
        100000: '100000 BITS!',
      },
    },
    '#channel2': {
      subscriptions: {
        custom1: '',
        custom2: '',
        custom3: '',
      },
      giftsubscriptions: {
        custom1: '',
        custom2: '',
        custom3: '',
      },
      resubscriptions: {
        custom1: '',
        custom2: '',
        custom3: '',
      },
      bits: {
        custom1: '',
        custom2: '',
        custom3: '',
      },
      bitsThresholds: {
        1000: '',
        5000: '',
        10000: '',
        25000: '',
        50000: '',
        75000: '',
        100000: '',
      },
    },
  },
};

export { Config };
