import * as utils from 'v2/libs';
import { initializeCache } from 'v2/services/LocalCache';
import { Account, ExtendedAccount } from './types';

export default class AccountServiceBase {
  // TODO: Add duplication/validation handling.
  public init = () => {
    initializeCache();
  };

  public createAccount = (account: Account) => {
    this.init();
    // Handle Account
    const uuid = utils.generateUUID();

    const localCache = localStorage.getItem('MyCryptoCache') || '{}';
    let parsedLocalCache;
    try {
      parsedLocalCache = JSON.parse(localCache);
    } catch (e) {
      parsedLocalCache = localCache;
    }
    const newAccountCache = parsedLocalCache;
    newAccountCache.accounts[uuid] = account;

    newAccountCache.allAccounts = [...newAccountCache.allAccounts, uuid];
    localStorage.setItem('MyCryptoCache', JSON.stringify(newAccountCache));
  };

  public readAccount = (uuid: string) => {
    this.init();
    const localCache = localStorage.getItem('MyCryptoCache') || '{}';
    let parsedLocalCache;
    try {
      parsedLocalCache = JSON.parse(localCache);
    } catch {
      parsedLocalCache = localCache;
    }
    return parsedLocalCache.accounts[uuid];
  };

  public updateAccount = (uuid: string, account: Account) => {
    this.init();
    const localCache = localStorage.getItem('MyCryptoCache') || '{}';
    let parsedLocalCache;
    try {
      parsedLocalCache = JSON.parse(localCache);
    } catch {
      parsedLocalCache = localCache;
    }
    const newAccountCache = Object.assign({}, parsedLocalCache.accounts[uuid], account);

    localStorage.setItem('MyCryptoCache', JSON.stringify(newAccountCache));
  };

  public deleteAccount = (uuid: string) => {
    this.init();
    // Handle Account
    const localCache = localStorage.getItem('MyCryptoCache') || '{}';
    let parsedLocalCache;
    try {
      parsedLocalCache = JSON.parse(localCache);
    } catch {
      parsedLocalCache = localCache;
    }
    delete parsedLocalCache.accounts[uuid];
    const newallAccounts = parsedLocalCache.allAccounts.filter((obj: string) => obj !== uuid);
    parsedLocalCache.allAccounts = newallAccounts;
    const newCache = parsedLocalCache;
    localStorage.setItem('MyCryptoCache', JSON.stringify(newCache));
  };

  public readAccounts = (): ExtendedAccount[] => {
    this.init();
    const localCache = localStorage.getItem('MyCryptoCache') || '[]';
    let parsedLocalCache: any;
    let out: ExtendedAccount[] = [];
    try {
      parsedLocalCache = JSON.parse(localCache);
    } catch (e) {
      parsedLocalCache = localCache;
    }
    if (parsedLocalCache.allAccounts && parsedLocalCache.allAccounts.length >= 1) {
      parsedLocalCache.allAccounts.map((uuid: string) => {
        out.push({ ...parsedLocalCache.accounts[uuid], uuid });
      });
    } else {
      out = [];
    }

    return out;
  };
}
