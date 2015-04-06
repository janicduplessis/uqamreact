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

var ScheduleActionCreators = require('../actions/ScheduleActionCreators');
var ScheduleStore = require('../stores/ScheduleStore');

class ScheduleScreen extends React.Component {
  constructor() {
    this.state = {
      loading: true,
      schedule: null,
    };

    ScheduleStore.addChangeListener((schedule) => {
      this.setState({
        loading: false,
        schedule: schedule,
      });
    });
  }

  componentDidMount() {
    ScheduleActionCreators.getSchedule();
  }

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
