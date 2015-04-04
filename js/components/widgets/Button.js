/**
 * @flow
 */
 'use strict';

let React = require('react-native');
let {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = React;

class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>{this.props.children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

let styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: '#007AFF',
  },
});

module.exports = Button;
