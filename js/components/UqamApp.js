/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  View,
} = React;

var UserActions = require('../actions/UserActions');
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
  }

  onChange() {
    this.setState({
      loading: false,
      user: UserStore.getUser(),
    });
  }

  componentDidMount() {
    UserStore.listen(this.onChange.bind(this));
    UserActions.initLogin();
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange.bind(this));
  }

  render() {
    if(this.state.loading) {
      return <View />;
    }
    return this.state.user !== null ? <MainTabsController /> : <LoginScreen />;
  }
}

module.exports = UqamApp;
