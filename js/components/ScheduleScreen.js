/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  StyleSheet,
  View,
  Text,
  ScrollView,
} = React;

var ScheduleActionCreators = require('../actions/ScheduleActionCreators');
var ScheduleStore = require('../stores/ScheduleStore');

class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      schedule: null,
    };

    ScheduleStore.addChangeListener(() => {
      this.setState({
        loading: false,
        schedule: ScheduleStore.get('20151'),
      });
    });
  }

  componentDidMount() {
    ScheduleActionCreators.getSchedule();
  }

  render() {
    if (this.state.loading || !this.state.schedule) {
      return (
        <View style={styles.center}>
          <ActivityIndicatorIOS
            size="large" />
        </View>
      );
    }
    var courseList = this.state.schedule.courses.map((c, i) => {
      var periodsList = c.schedule.map((p, i) => {
        return (
          <View key={i}>
            <Text>{p.day}</Text>
            <Text>{p.start} - {p.end}</Text>
            <Text>{p.local}</Text>
          </View>
        );
      });
      return (
        <View key={i}>
          <Text>{c.title}</Text>
          <View>{periodsList}</View>
        </View>
      );
    });
    return (
      <ScrollView style={styles.container}>
        {courseList}
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
  },
});

module.exports = ScheduleScreen;
