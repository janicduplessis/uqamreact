import {AsyncStorage} from 'react-native';

import ApiUtils from './ApiUtils';

const KEY_USER_STORE = 'user_store';

export default {
  loadUser() {
    return AsyncStorage.getItem(KEY_USER_STORE)
      .then((result) => {
        const user = JSON.parse(result);
        if (user && user.auth) {
          ApiUtils.setAuth(user.auth.code, user.auth.nip);
        }
      });
  },

  login(code, nip) {
    return ApiUtils.login(code, nip)
      .then((userErr) => {
        const {user, error} = userErr;
        if (user && user.auth && !error) {
          ApiUtils.setAuth(user.auth.code, user.auth.nip);
        }
        AsyncStorage.setItem(KEY_USER_STORE, JSON.stringify(user));
        return Promise.resolve(userErr);
      });
  },

  logout() {
    AsyncStorage.removeItem(KEY_USER_STORE);
  },
};
