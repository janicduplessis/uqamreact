/**
 * @flow
 */
import React, {
  Component,
  PropTypes,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {connect} from 'react-redux';

import {loadAppData, setCurrentRoute} from '../actions/appActions';
import {loadUser} from '../actions/userActions';
import colors from '../styles/colors';

import LoginScreen from './LoginScreen';
import NavigationHandler from './NavigationHandler';

class UqamApp extends Component {

  static propTypes = {
    user: PropTypes.object,
    appData: PropTypes.object,
  };

  componentDidMount() {
    this.props.dispatch(
      loadUser(),
    );
    this.props.dispatch(
      loadAppData(),
    );
  }

  onRouteChange(route) {
    this.props.dispatch(
      setCurrentRoute(route),
    );
  }

  render() {
    let content;
    if (!this.props.user || !this.props.appData) {
      content = <View />;
    } else {
      content = this.props.user.logged ?
      <NavigationHandler
        route={this.props.appData.route}
        onRouteChange={(route) => this.onRouteChange(route)}
      /> :
      <LoginScreen />;
    }
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.primaryDark}
          barStyle="light-content"
        />
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect((state) => ({
  user: state.user,
  appData: state.app,
}))(UqamApp);
