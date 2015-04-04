/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  NavigatorIOS,
  StyleSheet,
  TabBarIOS,
  View,
} = React;
var TabBarItemIOS = TabBarIOS.Item;

var HomeScreen = require('./HomeScreen');
var GradesScreen = require('./GradesScreen');
var ScheduleScreen = require('./ScheduleScreen');

class MainTabsController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'homeTab',
    };
  }
  render() {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}>
        <TabBarItemIOS
          name="homeTab"
          title="Home"
          icon={{uri: 'homeIcon', isStatic: true}}
          accessibilityLabel="Home Tab"
          selected={this.state.selectedTab === 'homeTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'homeTab',
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'Home',
              component: HomeScreen,
            }}
          />
        </TabBarItemIOS>
        <TabBarItemIOS
          name="gradesTab"
          title="Grades"
          icon={{uri: 'gradesIcon', isStatic: true}}
          accessibilityLabel="Grades Tab"
          selected={this.state.selectedTab === 'gradesTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'gradesTab',
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'Grades',
              component: GradesScreen,
            }}
          />
        </TabBarItemIOS>
        <TabBarItemIOS
          name="scheduleTab"
          title="Schedule"
          icon={{uri: 'scheduleIcon', isStatic: true}}
          accessibilityLabel="Home Tab"
          selected={this.state.selectedTab === 'scheduleTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'scheduleTab',
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'Schedule',
              component: ScheduleScreen,
            }}
          />
        </TabBarItemIOS>
      </TabBarIOS>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

module.exports = MainTabsController;
