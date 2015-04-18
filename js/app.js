/**
 * Entry point for the app.
 * @flow
 */
'use strict';

require('./polyfills');

var React = require('react-native');
var {
  AppRegistry,
} = React;

var UqamApp = require('./components/UqamApp');

class UqamMobileNative extends React.Component {
  render() {
    return <UqamApp />;
  }
}

AppRegistry.registerComponent('UqamMobileNative', () => UqamMobileNative);
