/**
 * @flow
 */
'use strict';

let Dispatcher = require('../dispatcher/Dispatcher');
let UserConstants = require('../constants/UserConstants');

let ActionTypes = UserConstants.ActionTypes;

module.exports = {
	receiveUser(user, error) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_USER,
      user: user,
      error: error,
    });
  },
};
