/**
 * @flow
 */
import React, {
  Component,
  PropTypes,
  View,
} from 'react-native';
import {connect} from 'react-redux';

import {loadAppData, setCurrentRoute} from '../actions/appActions';
import {loadUser} from '../actions/userActions';

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
    if (!this.props.user || !this.props.appData) {
      return <View />;
    }
    return (
      this.props.user.logged ?
      <NavigationHandler
        route={this.props.appData.route}
        onRouteChange={(route) => this.onRouteChange(route)}
      /> :
      <LoginScreen />
    );
  }
}

export default connect((state) => ({
  user: state.user,
  appData: state.app,
}))(UqamApp);
