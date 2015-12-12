import Storage from './Storage';

import ApiUtils from './ApiUtils';
import ApiClient from './ApiClient';

const KEY_USER_STORE = 'user_store';

export default {
  loadUser() {
    return Storage.getItem(KEY_USER_STORE)
      .then((user) => {
        if (user && user.auth) {
          ApiClient.setAuth(user.auth.code, user.auth.nip);
        }
        return user;
      });
  },

  login(code, nip) {
    return ApiUtils.login(code, nip)
      .then((userErr) => {
        const {user, error} = userErr;
        if (user && user.auth && !error) {
          ApiClient.setAuth(user.auth.code, user.auth.nip);
        }
        Storage.setItem(KEY_USER_STORE, user);
        return Promise.resolve(userErr);
      });
  },

  logout() {
    Storage.removeItem(KEY_USER_STORE);
  },
};
