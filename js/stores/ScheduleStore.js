/**
 * @flow
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Dispatcher = require('../dispatcher/Dispatcher');
var ScheduleConstants = require('../constants/ScheduleConstants');

var ActionTypes = ScheduleConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _schedule = [];

var ScheduleStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT, _schedule);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function(session: string) {
    return _schedule.find((e) => {
      if(e.session === session) {
        return true;
      }
      return false;
    });
  },
});

ScheduleStore.dispatchToken = Dispatcher.register((action) => {
  switch(action.type) {
  case ActionTypes.RECEIVE_SCHEDULE:
    _schedule = action.schedule;
    ScheduleStore.emitChange();
    break;
  }
});

module.exports = ScheduleStore;
