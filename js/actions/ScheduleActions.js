'use strict';

var invariant = require('invariant');

var {
  Flux,
  Actions,
} = require('../Flux');

var ScheduleUtils = require('../utils/ScheduleUtils');

class ScheduleActions extends Actions {

  getSchedule() {
    ScheduleUtils.getSchedule()
    .then((schedule) => {
      this.receiveSchedule(schedule);
    })
    .catch((error) => {
      invariant(false, 'Unhandled error occured. %s', error);
    });
  }

  receiveSchedule(schedule) {
    return schedule;
  }
}

module.exports = Flux.createActions('schedule', ScheduleActions);

