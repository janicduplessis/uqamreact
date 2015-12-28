import EventEmitter from 'event-emitter';

import HomeScreen from './components/HomeScreen';
import GradesScreen from './components/GradesScreen';
import ScheduleScreen from './components/ScheduleScreen';

class Route {
  constructor(Component, props) {
    Object.assign(this, props);
    this.Component = Component;
    this.eventEmitter = new EventEmitter();
  }
}

export default [
  new Route(HomeScreen, {
    title: 'Home',
    icon: require('./images/icons/home-black-24.png'),
  }),
  new Route(GradesScreen, {
    title: 'Grades',
    icon: require('./images/icons/school-black-24.png'),
    actions: [{
      title: 'Session',
      icon: require('./images/icons/today-white-24.png'),
      show: 'always',
    }],
  }),
  new Route(ScheduleScreen, {
    title: 'Schedule',
    icon: require('./images/icons/today-black-24.png'),
    actions: [{
      title: 'Session',
      icon: require('./images/icons/today-white-24.png'),
      show: 'always',
    }],
  }),
];
