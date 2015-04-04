/**
 * Entry point for the app.
 * @flow
 */
'use strict';

let React = require('react-native');
let {
  AppRegistry,
} = React;

let UqamApp = require('./components/UqamApp');

class UqamMobileNative extends React.Component {
  render() {
    return <UqamApp />;
  }
}

AppRegistry.registerComponent('UqamMobileNative', () => UqamMobileNative);
