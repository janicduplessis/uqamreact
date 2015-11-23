import React, {
  Component,
  ActivityIndicatorIOS,
} from 'react-native';

export default class Progress extends Component {
  render() {
    return (
      <ActivityIndicatorIOS
        size="large"
      />
    );
  }
}
