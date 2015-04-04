/**
 * @flow
 */
'use strict';

var Dispatcher = require('../dispatcher/Dispatcher');
var UserConstants = require('../constants/UserConstants');

var ActionTypes = UserConstants.ActionTypes;

module.exports = {
	receiveUser(user, error) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_USER,
      user: user,
      error: error,
    });
  },
}
