/**
 * @flow
 */
'use strict';

let React = require('react-native');
let {
  View,
  AlertIOS,
} = React;

let UserActionCreators = require('../actions/UserActionCreators');
let UserStore = require('../stores/UserStore');

let LoginScreen = require('./LoginScreen');
let MainTabsController = require('./MainTabsController');

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
