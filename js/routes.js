/**
 * @flow
 */

import EventEmitter from 'event-emitter';

import HomeScreen from './components/HomeScreen';
import GradesScreen from './components/GradesScreen';
import ScheduleScreen from './components/ScheduleScreen';

type RouteConfig = {
  title: string,
  icon: number,
  actions?: [Action],
};

type Action = {
  title: string,
  icon: number,
  show: string,
};

class Route {
  Component: ReactComponent;
  eventEmitter: EventEmitter;
  title: string;
  icon: number;
  actions: ?[Action];

  constructor(Component: ReactComponent, props: RouteConfig) {
    this.Component = Component;
    this.eventEmitter = new EventEmitter();
    Object.assign(this, props);
  }
}

const routes: [Route] = [
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

export default routes;
