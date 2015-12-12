/**
 * @flow
 */
import React, {
  Component,
  PropTypes,
  View,
} from 'react-native';
import {connect} from 'react-redux/native';

import {loadUser, loadAppData, setCurrentRoute} from '../actions/actionCreators';

import LoginScreen from './LoginScreen';
import NavigationHandler from './NavigationHandler';

class UqamApp extends Component {

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

UqamApp.propTypes = {
  user: PropTypes.object,
  appData: PropTypes.object,
};

export default connect((state) => {
  return {
    user: state.user,
    appData: state.app,
  };
})(UqamApp);
