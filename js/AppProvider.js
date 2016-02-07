/**
 * @flow
 */

import React, {Component} from 'react-native';
import {Provider} from 'react-redux';

import store from './store';
import UqamApp from './components/UqamApp';

export default class AppProvider extends Component {
  render() {
    return (
      <Provider store={store}>
        <UqamApp />
      </Provider>
    );
  }
}
