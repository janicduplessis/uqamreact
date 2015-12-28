/**
 * @flow
 */
import React, {
  Component,
  PropTypes,
  DrawerLayoutAndroid,
  Navigator,
  ToolbarAndroid,
  TouchableNativeFeedback,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import colors from '../styles/colors';
import routes from '../routes';

export default class NavigationHandler extends Component {

  static propTypes = {
    route: PropTypes.number.isRequired,
    onRouteChange: PropTypes.func.isRequired,
  }

  state = {
    selected: this.props.route,
  };

  onOpenNavigation() {
    this.refs.drawer.openDrawer();
  }

  onNavigationItemClick(index: number) {
    const screen = routes[index];
    this.refs.drawer.closeDrawer();
    this.refs.navigator.immediatelyResetRouteStack([{
      index: 0,
      ...screen,
    }]);
    this.setState({
      selected: index,
    });
    this.props.onRouteChange(index);
  }

  renderNavigationView() {
    const listItems = routes.map((route, i) => {
      const selected = i === this.state.selected;
      return (
        <TouchableNativeFeedback
          key={i}
          onPress={() => this.onNavigationItemClick(i)}
        >
          <View style={[styles.navigationListItem, selected && styles.navigationListItemSelected]}>
            <Image source={route.icon} style={[styles.navigationListIcon, selected && styles.navigationListIconSelected]} />
            <Text style={selected && styles.navigationListTextSelected}>
              {route.title}
            </Text>
          </View>
        </TouchableNativeFeedback>
      );
    });

    return (
      <View style={styles.navigation}>
        <Text style={styles.navigationTitle}>UQAM Portal</Text>
        <View style={styles.navigationList}>
          {listItems}
        </View>
      </View>
    );
  }

  renderContent() {
    const screen = routes[this.state.selected];
    return (
      <Navigator
        ref="navigator"
        initialRoute={{
          index: 0,
          ...screen,
        }}
        renderScene={(route, navigator) =>
          <View style={styles.container}>
            <ToolbarAndroid
              navIcon={require('../images/icons/menu-white-24.png')}
              onIconClicked={() => this.onOpenNavigation()}
              title={route.title}
              titleColor="white"
              subtitleColor="white"
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
  navigation: {
    flex: 1,
    backgroundColor: 'white',
  },
  navigationTitle: {
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 16,
    fontSize: 22,
  },
  navigationList: {
    flex: 1,
    flexDirection: 'column',
  },
  navigationListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  navigationListItemSelected: {
    backgroundColor: colors.grayLight,
  },
  navigationListTextSelected: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  navigationListIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    opacity: 0.54,
  },
  navigationListIconSelected: {
    tintColor: colors.primary,
    opacity: 1,
  },
});
