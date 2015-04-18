/**
 * @flow
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Dispatcher = require('../dispatcher/Dispatcher');
var UserConstants = require('../constants/UserConstants');

type User = {
  firstName: string;
  lastName: string;
  auth: {
    code: string;
    nip: string;
  };
};

var ActionTypes = UserConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var ERROR_EVENT = 'error';

var _user: ?User = null;

var UserStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT, _user);
  },

  emitError(error) {
    this.emit(ERROR_EVENT, error);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  addErrorListener(callback) {
    this.on(ERROR_EVENT, callback);
  },

  removeErrorListener(callback) {
    this.removeListener(ERROR_EVENT, callback);
  },

  get(): ?User {
    return _user;
  },
});

UserStore.dispatchToken = Dispatcher.register((action) => {
  switch(action.type) {
  case ActionTypes.RECEIVE_USER:
    if(action.error !== null) {
      UserStore.emitError(action.error);
      _user = null;
    } else {
      _user = action.user;
    }
    UserStore.emitChange();
    break;
  }
});

module.exports = UserStore;
