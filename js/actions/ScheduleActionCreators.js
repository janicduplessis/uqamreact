/**
 * @flow
 */
'use strict';

var Dispatcher = require('../dispatcher/Dispatcher');
var ScheduleConstants = require('../constants/ScheduleConstants');
var ScheduleUtils = require('../utils/ScheduleUtils');

var ActionTypes = ScheduleConstants.ActionTypes;

module.exports = {
  getSchedule() {
    Dispatcher.dispatch({
      type: ActionTypes.GET_SCHEDULE,
    });
    ScheduleUtils.getSchedule('20151');
  },
};
