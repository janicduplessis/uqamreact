/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  View,
} = React;

var UserActionCreators = require('../actions/UserActionCreators');
var UserStore = require('../stores/UserStore');

var LoginScreen = require('./LoginScreen');
var MainTabsController = require('./MainTabsController');

class UqamApp extends React.Component {
  constructor(props) {
    super(props);

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
