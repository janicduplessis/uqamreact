/**
 * @flow
 */
import React, {
  Component,
  NavigatorIOS,
  StyleSheet,
  TabBarIOS,
  StatusBarIOS,
} from 'react-native';
const TabBarItemIOS = TabBarIOS.Item;

import HomeScreen from './HomeScreen';
import GradesScreen from './GradesScreen';
import ScheduleScreen from './ScheduleScreen';
import colors from '../utils/colors';

export default class NavigationHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'homeTab',
    };
  }

  componentDidMount() {
    StatusBarIOS.setStyle('light-content', true);
  }

  render() {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={colors.primary}
      >
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
            barTintColor={colors.primary}
            titleTextColor={colors.white}
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
            barTintColor={colors.primary}
            titleTextColor={colors.white}
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
            barTintColor={colors.primary}
            titleTextColor={colors.white}
            style={styles.container}
            initialRoute={{
              title: 'Schedule',
              component: ScheduleScreen,
            }}
          />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
