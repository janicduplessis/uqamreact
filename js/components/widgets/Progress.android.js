import React, {
  Component,
  ProgressBarAndroid,
} from 'react-native';

export default class Progress extends Component {
  render() {
    return (
      <ProgressBarAndroid
        indeterminate
        styleAttr="Large"
      />
    );
  }
}
