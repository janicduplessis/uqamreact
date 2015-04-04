/**
 * @flow
 */
'use strict';

let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

let Dispatcher = require('../dispatcher/Dispatcher');
let GradesConstants = require('../constants/GradesConstants');

let ActionTypes = GradesConstants.ActionTypes;
const CHANGE_EVENT = 'change';

let _grades = null;

let GradesStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT, _grades);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function() {
    return _grades;
  },
});

GradesStore.dispatchToken = Dispatcher.register((action) => {
  switch(action.type) {
  case ActionTypes.RECEIVE_GRADES:
    _grades = action.grades;
    GradesStore.emitChange();
    break;
  }
});

module.exports = GradesStore;
