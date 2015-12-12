/**
 * @flow
 */
import React, {
  Component,
  ActivityIndicatorIOS,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';

class ScheduleScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      schedule: null,
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicatorIOS
            size="large" />
        </View>
      );
    }
    const courseList = this.state.schedule.toJS().courses.map((c, i) => {
      const periodsList = c.schedule.map((p, j) => {
        return (
          <View key={j}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
  },
});

module.exports = ScheduleScreen;
