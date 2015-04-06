/**
 * @flow
 */
'use strict';

var ScheduleServerActionCreators = require('../actions/ScheduleServerActionCreators');
var ApiUtils = require('./ApiUtils');

module.exports = {
  getSchedule(session) {
    //TODO: local cache
    ApiUtils.getSchedule()
      .then((schedule) => {
        ScheduleServerActionCreators.receiveSchedule(schedule);
      })
      .catch((error) => {

      });
  },
};
