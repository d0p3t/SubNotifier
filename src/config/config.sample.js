/**
 * Configuration file for SubNotifier. Please follow strict guidelines (see README)
 * Variables:
 *      {{username}} - The username of the person who subscribed/cheered
 *      {{months}} - Amount of months username has resubscribed for (ONLY resubscriptions!)
 *      {{years}} - If resubbed more than one year, will display '[ X year(s) and X month(s)]'
 *      {{bits}} - Amount of bits cheered (ONLY bits!)
 * @type {Object}
 */
const Config = {
  clientId: '',
  username: '',
  token: '',
  channels: ['#d0p3t', '#channel2'],
  enableDebug: false,
  enableSecureMode: true,
  enableMeMode: true,
  enableSubAlerts: true,
  enableResubAlerts: true,
  enableBitAlerts: false,
  enableCustomMessages: true,
  customMessages: {
    '#d0p3t': {
      subscriptions: {
        custom1: 'PogChamp SUB Thank you for subscribing {{username}}',
        custom2: 'CoolStoryBob SUB Thank you for subscribing {{username}}',
        custom3: 'DansGame SUB Thank you for subscribing {{username}}' },
      resubscriptions: {
        custom1: 'PogChamp RESUB Thank you {{username}} for resubscribing for {{months}} months! {{years}}',
        custom2: 'WutFace RESUB Thank you {{username}} for resubscribing for {{months}} months! {{years}}',
        custom3: '<3 RESUB Thank you {{username}} for resubscribing for {{months}} months! {{years}}' },
      bits: {
        custom1: 'Wowzers, {{username}} cheered {{bits}} BITS!',
        custom2: 'Oh so kind, {{username}} with the {{bits}} BITS!',
        custom3: 'LUL we got a happy cheerer over here ({{username}}: {{bits}} bits)!' },
    },
    '#channel2': {
      subscriptions: {
        custom1: '',
        custom2: '',
        custom3: '' },
      resubscriptions: {
        custom1: '',
        custom2: '',
        custom3: '' },
      bits: {
        custom1: '',
        custom2: '',
        custom3: '' },
    },
  },
};

export { Config };
