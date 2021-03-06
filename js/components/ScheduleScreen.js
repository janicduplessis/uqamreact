/**
 * @flow
 */
import React, {
  Component,
  PropTypes,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';

import Button from './widgets/Button';
import Progress from './widgets/Progress';
import SessionPickerDialog from './SessionPickerDialog';
import {getSchedule} from '../actions/scheduleActions';
import {setScheduleSession} from '../actions/appActions';
import {getSessionName} from '../utils/SessionUtils';
import colors from '../styles/colors';
import listStyles from '../styles/list';

const ios = Platform.OS === 'ios';

class ScheduleScreen extends Component {

  static propTypes = {
    schedule: PropTypes.array.isRequired,
    session: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    routeEvents: PropTypes.object.isRequired,
  };

  _dialog: any;

  componentDidMount() {
    this.props.routeEvents.on('action', this.onActionSelected);
    if (this.props.loading) {
      this.props.dispatch(
        getSchedule(),
      );
    }
  }

  componentWillUnmount() {
    this.props.routeEvents.off('action', this.onActionSelected);
  }

  onActionSelected = () => {
    this._dialog.show();
  };

  onSessionChange(session) {
    this.props.dispatch(
      setScheduleSession(session),
    );
  }

  renderProgress() {
    return (
      <View style={styles.center}>
        <Progress />
      </View>
    );
  }

  renderNoCourses() {
    return (
      <View style={styles.noCoursesContainer}>
        <Text style={styles.noCourses}>No courses for this session.</Text>
        <Button
          flat
          onPress={() => this.onActionSelected()}
        >
          Change session
        </Button>
      </View>
    );
  }

  renderSchedule(schedule) {
    const courseList = schedule.courses.map((c, i) => {
      const periodsList = c.schedule.map((p, j) =>
        <View key={j}>
          {
            j !== 0 ? <View style={listStyles.separator} /> : null
          }
          <View style={styles.dayRow}>
            <Text style={styles.day}>{p.day}</Text>
            <Text>{p.note}</Text>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.time}>{p.start} - {p.end}</Text>
            <Text>{p.locals.join(', ')}</Text>
          </View>
        </View>
      );
      return (
        <View key={i} style={listStyles.item}>
          <Text style={listStyles.header}>{c.title}</Text>
          <View style={listStyles.content}>
            <Text style={styles.teacher}>{c.teacher}</Text>
            <View style={listStyles.separator} />
            {periodsList}
          </View>
        </View>
      );
    });
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.session}>
          {getSessionName(this.props.session)}
        </Text>
        {courseList}
      </ScrollView>
    );
  }

  render() {
    let content;
    if (this.props.loading) {
      content = this.renderProgress();
    } else {
      const schedule = this.props.schedule.find(s => s.session === this.props.session);
      if (!schedule || !schedule.courses.length) {
        content = this.renderNoCourses();
      } else {
        content = this.renderSchedule(schedule);
      }
    }
    return (
      <View style={[styles.container, styles.background]}>
        <SessionPickerDialog
          session={this.props.session}
          onSessionChange={(s) => this.onSessionChange(s)}
          ref={c => this._dialog = c}
        />
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: ios ? 132 : 16,
  },
  background: {
    backgroundColor: colors.grayLight,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCoursesContainer: {
    alignItems: 'center',
  },
  noCourses: {
    marginTop: 32,
    marginBottom: 8,
    fontSize: 18,
  },
  session: {
    marginVertical: 8,
    marginHorizontal: 8,
    fontSize: 20,
  },
  teacher: {
    fontSize: 14,
    marginVertical: 8,
  },
  dayRow: {
    flexDirection: 'row',
  },
  timeRow: {
    flexDirection: 'row',
  },
  day: {
    flex: 1,
    fontWeight: 'bold',
  },
  time: {
    flex: 1,
  },
});

export default connect((state) => ({
  loading: state.schedule.loading,
  schedule: state.schedule.edges,
  session: state.app.scheduleSession,
}))(ScheduleScreen);
