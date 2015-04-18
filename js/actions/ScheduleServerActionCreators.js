/**
 * @flow
 */
'use strict';

var Dispatcher = require('../dispatcher/Dispatcher');
var ScheduleConstants = require('../constants/ScheduleConstants');

var ActionTypes = ScheduleConstants.ActionTypes;

module.exports = {
  receiveSchedule(schedule: any, error?: Error) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_SCHEDULE,
      schedule: schedule,
      error: error,
    });
  },
};
