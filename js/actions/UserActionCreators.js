/**
 * @flow
 */
'use strict';

var Dispatcher = require('../dispatcher/Dispatcher');
var UserConstants = require('../constants/UserConstants');
var UserUtils = require('../utils/UserUtils');

var ActionTypes = UserConstants.ActionTypes;

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
