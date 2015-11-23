import React, {Component} from 'react-native';
import {Provider} from 'react-redux/native';

import store from './store';
import UqamApp from './components/UqamApp';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <UqamApp />}
      </Provider>
    );
  }
}

export default function() {
  return App;
}
