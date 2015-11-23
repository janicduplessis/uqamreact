/**
 * @flow
 */
import React, {
  Component,
  PropTypes,
  View,
} from 'react-native';
import {connect} from 'react-redux/native';

import {loadUser} from '../actions/actionCreators';

import LoginScreen from './LoginScreen';
import NavigationHandler from './NavigationHandler';

class UqamApp extends Component {

  componentDidMount() {
    this.props.dispatch(
      loadUser(),
    );
  }

  render() {
    if (!this.props.user) {
      return <View />;
    }
    return (
      this.props.user.logged ?
      <NavigationHandler /> :
      <LoginScreen />
    );
  }
}

UqamApp.propTypes = {
  user: PropTypes.object,
};

export default connect((state) => {
  return {
    user: state.user,
  };
})(UqamApp);
