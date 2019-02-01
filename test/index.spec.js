import { expect } from 'chai';
import { TwitchBot } from '../dist/lib/TwitchBot';
import { Config } from '../dist/config/config';

describe('Check Config', () => {
  describe('ClientId variable', () => {
    it('should not be empty or null', () => {
      expect(Config.clientId).to.not.be.empty;
    });
  });
  describe('Username variable', () => {
    it('should not be empty or null', () => {
      expect(Config.username).to.not.be.empty;
    });
  });
  describe('Token variable', () => {
    it('should not be empty or null', () => {
      expect(Config.token).to.not.be.empty;
    });
  });
});