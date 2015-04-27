'use strict';

var {
  fromJS,
  List,
} = require('immutable');

var {
  Flux,
  Store,
} = require('../Flux');

var ScheduleActions = require('../actions/ScheduleActions');

class ScheduleStore extends Store {
  constructor() {
    super();

    this.register(ScheduleActions.receiveSchedule, this.receiveSchedule);

    this.state = {
      schedule: new List(),
    };
  }

  get(session) {
    return this.state.schedule.find((s) => s.get('session') === session);
  }

  receiveSchedule(schedule) {
    this.setState({
      schedule: fromJS(schedule),
    });
  }
}

module.exports = Flux.createStore('schedule', ScheduleStore);
