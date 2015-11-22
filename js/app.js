import React from 'react-native';
import {Provider} from 'react-redux/native';

import store from './store';
import UqamApp from './components/UqamApp';

export default function() {
  return (
    <Provider store={store}>
      {() => <UqamApp />}
    </Provider>
  );
}
