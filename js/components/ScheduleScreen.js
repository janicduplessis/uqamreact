/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
} = React;

class ScheduleScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Schedule
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
      alignItems: 'center',
  },
});

module.exports = ScheduleScreen;
