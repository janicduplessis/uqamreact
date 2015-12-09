/**
 * @flow
 */
import React, {
  Component,
  DrawerLayoutAndroid,
  Navigator,
  ToolbarAndroid,
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import EventEmitter from 'event-emitter';

import HomeScreen from './HomeScreen';
import GradesScreen from './GradesScreen';
import ScheduleScreen from './ScheduleScreen';
import colors from '../utils/colors';

const mainScreens = [{
  title: 'Home',
  icon: '',
  Component: HomeScreen,
}, {
  title: 'Grades',
  icon: '',
  Component: GradesScreen,
  actions: [{
    title: 'Change session',
    icon: require('../images/icons/menu-white-36.png'),
    show: 'always',
  }],
  eventEmitter: new EventEmitter(),
}, {
  title: 'Schedule',
  icon: '',
  Component: ScheduleScreen,
}];

export default class NavigationHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }

  onOpenNavigation() {
    this.refs.drawer.openDrawer();
  }

  onNavigationItemClick(index: number) {
    const screen = mainScreens[index];
    this.refs.drawer.closeDrawer();
    this.refs.navigator.immediatelyResetRouteStack([{
      name: screen.title,
      index: 0,
      actions: screen.actions || [],
      eventEmitter: screen.eventEmitter,
    }]);
    this.setState({
      selected: index,
    });
  }

  renderNavigationView() {
    const listItems = mainScreens.map((screen, i) => {
      return (
        <TouchableNativeFeedback
          onPress={() => this.onNavigationItemClick(i)}
        >
          <View style={styles.navigationListItem}>
            <Text style={(i === this.state.selected) && styles.navigationListItemSelected}>
              {screen.title}
            </Text>
          </View>
        </TouchableNativeFeedback>
      );
    });

    return (
      <View style={styles.navigationList}>
        {listItems}
      </View>
    );
  }

  renderContent() {
    const screen = mainScreens[this.state.selected];
    return (
      <Navigator
        ref="navigator"
        initialRoute={{name: screen.title, index: 0, actions: screen.actions || [], eventEmitter: screen.eventEmitter}}
        renderScene={(route, navigator) =>
          <View style={styles.container}>
            <ToolbarAndroid
              navIcon={require('../images/icons/menu-white-36.png')}
              onIconClicked={() => this.onOpenNavigation()}
              title={route.name}
              titleColor="white"
              actions={route.actions}
              style={styles.toolbar}
              onActionSelected={(pos) => {
                route.eventEmitter.emit('action', pos);
              }}
            />
            <screen.Component
              ref="component"
              style={styles.container}
              name={route.name}
              routeEvents={route.eventEmitter}
              onForward={() => {
                const nextIndex = route.index + 1;
                navigator.push({
                  name: 'Scene ' + nextIndex,
                  index: nextIndex,
                });
              }}
              onBack={() => {
                if (route.index > 0) {
                  navigator.pop();
                }
              }}
            />
          </View>
        }
      />
    );
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref="drawer"
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => this.renderNavigationView()}
      >
        <View style={styles.container}>
          {this.renderContent()}
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: colors.primary,
    height: 56,
  },
  navigationList: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  navigationListItem: {
    padding: 16,
  },
  navigationListItemSelected: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
