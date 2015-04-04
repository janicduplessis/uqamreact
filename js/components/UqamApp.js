/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  View,
  AlertIOS,
} = React;

var UserActionCreators = require('../actions/UserActionCreators');
var UserStore = require('../stores/UserStore');

var LoginScreen = require('./LoginScreen');
var MainTabsController = require('./MainTabsController');

class UqamApp extends React.Component {
  constructor() {
    this.state = {
      loading: true,
      user: null,
    };

    UserStore.addChangeListener((user) => {
      this.setState({
        loading: false,
        user: user,
      });
    });

    UserStore.addErrorListener(() => {
      AlertIOS.alert('Error', 'Invalid code or nip.');
    });
  }

  componentDidMount() {
    UserActionCreators.initLogin();
  }

  render() {
    if(this.state.loading) {
      return <View />;
    }
    return this.state.user !== null ? <MainTabsController /> : <LoginScreen />;
  }
}

module.exports = UqamApp;
