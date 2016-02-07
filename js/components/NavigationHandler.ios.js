/**
 * @flow
 */
import React, {
  Component,
  PropTypes,
  NavigatorIOS,
  StyleSheet,
  TabBarIOS,
  StatusBarIOS,
} from 'react-native';
const TabBarItemIOS = TabBarIOS.Item;

import colors from '../styles/colors';
import routes from '../routes';

type State = {
  selectedTabIndex: number,
};

export default class NavigationHandler extends Component {

  static propTypes = {
    route: PropTypes.number.isRequired,
    onRouteChange: PropTypes.func.isRequired,
  };

  state: State = {
    selectedTabIndex: this.props.route,
  };

  componentDidMount() {
    StatusBarIOS.setStyle('light-content', true);
  }

  render() {
    const tabs = routes.map((route, i) => {
      const rightTitle = route.actions &&
          route.actions[0] && route.actions[0].title;
      return (
        <TabBarItemIOS
          key={i}
          title={route.title}
          icon={route.icon}
          accessibilityLabel={route.title}
          selected={this.state.selectedTabIndex === i}
          onPress={() => {
            this.props.onRouteChange(i);
            this.setState({
              selectedTabIndex: i,
            });
          }}
        >
          <NavigatorIOS
            tintColor={colors.white}
            barTintColor={colors.primary}
            translucent={false}
            titleTextColor={colors.white}
            style={styles.container}
            initialRoute={{
              title: route.title,
              component: route.Component,
              passProps: {routeEvents: route.eventEmitter},
              rightButtonTitle: rightTitle,
              onRightButtonPress: () => {
                route.eventEmitter.emit('action', 0);
              },
            }}
          />
        </TabBarItemIOS>
      );
    });
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTabIndex}
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
