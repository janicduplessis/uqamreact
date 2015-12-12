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

import colors from '../utils/colors';
import routes from '../routes';

export default class NavigationHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
    };
  }

  componentDidMount() {
    StatusBarIOS.setStyle('light-content', true);
  }

  render() {
    const tabs = routes.map((route, i) => {
      return (
        <TabBarItemIOS
          title={route.title}
          icon={{uri: route.icon, isStatic: true}}
          accessibilityLabel={route.title}
          selected={this.state.selectedTabIndex === i}
          onPress={() => {
            this.setState({
              selectedTabIndex: i,
            });
          }}>
          <NavigatorIOS
            barTintColor={colors.primary}
            titleTextColor={colors.white}
            style={styles.container}
            initialRoute={{
              title: route.title,
              component: route.Component,
            }}
          />
        </TabBarItemIOS>
      );
    });
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={colors.primary}
      >
        {tabs}
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
