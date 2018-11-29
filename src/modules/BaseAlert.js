import Logger from '../lib/Logger';

/**
 * Class BaseAlert
 * @type {[class]}
 */
class BaseAlert {
  /**
   * [BaseAlert constructor]
   * @param {[string]} name [Name of the Alert]
   * @param {[Twitch.client]} client [Instantiated twitch-js client]
   */
  constructor(name, client) {
    this.name = name;
    this.client = client;
  }

  /**
   * [Start of BaseAlert]
   * @return {[none]} [description]
   */
  start() {
    Logger.debug(`Started ${this.constructor.name}`);
    this.client.on('*', (message) => {
      Logger.debug(`Incoming Message : ${message}`);
    });
  }
}

export { BaseAlert };
