/**
 * @flow
 */
'use strict';

let React = require('react-native');
let {
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

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
      alignItems: 'center',
  },
});

module.exports = ScheduleScreen;
