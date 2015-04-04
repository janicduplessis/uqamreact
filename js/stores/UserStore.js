/**
 * @flow
 */
'use strict';

let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

let Dispatcher = require('../dispatcher/Dispatcher');
let UserConstants = require('../constants/UserConstants');

let ActionTypes = UserConstants.ActionTypes;
const CHANGE_EVENT = 'change';
const ERROR_EVENT = 'error';

let _user = null;

let UserStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT, _user);
  },

  emitError: function(error) {
    this.emit(ERROR_EVENT, error);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  addErrorListener: function(callback) {
    this.on(ERROR_EVENT, callback);
  },

  removeErrorListener: function(callback) {
    this.removeListener(ERROR_EVENT, callback);
  },

  get: function() {
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
