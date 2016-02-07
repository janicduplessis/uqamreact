/**
 * @flow
 */

import Storage from './Storage';

import ApiUtils from './ApiUtils';
import ApiClient from './ApiClient';

const KEY_USER_STORE = 'user_store';

export default class UserUtils {

  static async loadUser() {
    const user = await Storage.getItem(KEY_USER_STORE);
    if (user && user.auth) {
      ApiClient.setAuth(user.auth.code, user.auth.nip);
    }
    return user;
  }

  static login(code: string, nip: string): Promise {
    return ApiUtils.login(code, nip)
      .then((user) => {
        if (user && user.auth) {
          ApiClient.setAuth(user.auth.code, user.auth.nip);
        }
        Storage.setItem(KEY_USER_STORE, user);
        return user;
      });
  }

  static logout() {
    Storage.removeItem(KEY_USER_STORE);
  }
}
