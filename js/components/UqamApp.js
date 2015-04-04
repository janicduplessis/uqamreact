/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  TabBarIOS,
  View,
  AlertIOS,
} = React;
var TabBarItemIOS = TabBarIOS.Item;

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

    UserStore.addErrorListener((error) => {
      AlertIOS.alert('Error', 'Invalid code or nip.');
    })
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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

module.exports = UqamApp;
