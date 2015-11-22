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
import MainTabsController from './MainTabsController';

class UqamApp extends Component {

  componentDidMount() {
    loadUser();
  }

  render() {
    if (!this.pros.user) {
      return <View />;
    }
    return (
      this.props.user.logged ?
      <MainTabsController /> :
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
