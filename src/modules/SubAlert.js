import Logger from '../lib/Logger';
import { BaseAlert } from './BaseAlert';

/**
 * Class SubAlert
 * @type {[class]}
 */
class SubAlert extends BaseAlert {
  /**
   * [Constructor of SubAlert class]
   * @param {string} name [Name of Alert]
   * @param {Twitch.client} client [Instantiated twitch-js client]
   */
  constructor(name, client) {
    super(name, client);
    Logger.debug(`Instantiated ${this.constructor.name}`);
  }
}

export { SubAlert };
