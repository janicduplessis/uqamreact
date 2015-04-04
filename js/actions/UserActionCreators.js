/**
 * @flow
 */
'use strict';

let Dispatcher = require('../dispatcher/Dispatcher');
let UserConstants = require('../constants/UserConstants');
let UserUtils = require('../utils/UserUtils');

let ActionTypes = UserConstants.ActionTypes;

module.exports = {

  initLogin() {
    Dispatcher.dispatch({
      type: ActionTypes.INIT_LOGIN,
    });
    UserUtils.getCurrentUser();
  },

  login(loginInfo) {
    Dispatcher.dispatch({
      type: ActionTypes.LOGIN,
      loginInfo: loginInfo,
    });
    UserUtils.login(loginInfo);
  },

  logout() {
    Dispatcher.dispatch({
      type: ActionTypes.LOGOUT,
    });
    UserUtils.logout();
  },

};
