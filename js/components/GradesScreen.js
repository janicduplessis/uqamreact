/**
 * @flow
 */
import React, {
  PropTypes,
  Component,
  ListView,
  StyleSheet,
  View,
  Text,
  RefreshControl,
  Platform,
} from 'react-native';
import {connect} from 'react-redux/native';

import Progress from './widgets/Progress';
import Button from './widgets/Button';
import SessionPickerDialog from './SessionPickerDialog';
import {getGrades} from '../actions/gradesActions';
import {setGradesSession} from '../actions/appActions';
import {getSessionName} from '../utils/SessionUtils';
import colors from '../styles/colors';
import listStyles from '../styles/list';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ios = Platform.OS === 'ios';

class GradesScreen extends Component {

  static propTypes = {
    grades: PropTypes.array,
    session: PropTypes.string,
    routeEvents: PropTypes.object,
  };

  state = {
    session: this.props.session,
    dataSource: ds.cloneWithRows(this.props.grades),
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.props.routeEvents.on('action', this.onActionSelected);
    this.onReload();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: ds.cloneWithRows(newProps.grades),
      loading: false,
      refreshing: false,
    });
  }

  componentWillUnmount() {
    this.props.routeEvents.off('action', this.onActionSelected);
  }

  onActionSelected = () => {
    this._dialog.show();
  }

  onReload() {
    this.props.dispatch(
      getGrades(this.state.session),
    );
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.onReload();
  }

  onSessionChange(session) {
    this.props.dispatch(
      setGradesSession(session),
    );
    this.setState({
      session: session,
      loading: true,
    }, () => {
      this.onReload();
    });
  }

  renderGrade(g) {
    return <GradeList grades={g} />;
  }

  renderHeader() {
    return (
      <View>
        <Text style={styles.session}>
          {getSessionName(this.state.session)}
        </Text>
      </View>
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

  renderGrades() {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.content}
          style={styles.container}
          dataSource={this.state.dataSource}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
              colors={[colors.primary]}
            />
          }
          renderRow={this.renderGrade}
          renderHeader={() => this.renderHeader()}
        />
      </View>
    );
  }

  render() {
    let content;
    if (this.state.loading) {
      content = this.renderProgress();
    } else if (!this.props.grades.length) {
      content = this.renderNoCourses();
    } else {
      content = this.renderGrades();
    }

    return (
      <View style={[styles.container, styles.background]}>
        <SessionPickerDialog
          session={this.state.session}
          onSessionChange={(s) => this.onSessionChange(s)}
          ref={c => this._dialog = c}
        />
        {content}
      </View>
    );
  }
}

export default connect((state) => ({
  grades: state.grades,
  session: state.app.gradesSession,
}))(GradesScreen);

class GradeList extends Component {

  static propTypes = {
    grades: PropTypes.object.isRequired,
  };

  render() {
    const grades = this.props.grades;

    if (!grades.grades.length) {
      return (
        <View style={listStyles.item}>
          <Text style={listStyles.header}>{grades.code} - {grades.group}</Text>
          <View style={[listStyles.content, styles.gradeRow]}>
            <Text>No grades for this course.</Text>
          </View>
        </View>
      );
    }

    const rows = grades.grades.map((g, i) => {
      return (
        <GradeRow
          key={i}
          name={g.name}
          result={g.result}
          average={g.average} />
      );
    });

    const final = grades.final ?
      <GradeRow
        name="Final"
        result={grades.final}
        average=" " /> : null;

    return (
      <View style={listStyles.item}>
        <Text style={listStyles.header}>{grades.code} - {grades.group}</Text>
        <View style={listStyles.content}>
          <View style={[styles.rowCells, styles.gradeRow]}>
            <Text style={[styles.gradeCell, styles.headerText]}>Name</Text>
            <Text style={[styles.gradeCell, styles.headerText]}>Result</Text>
            <Text style={[styles.gradeCell, styles.headerText]}>Average</Text>
          </View>
          {rows}
          <GradeRow
            name="Total"
            result={grades.total.result}
            average={grades.total.average} />
          {final}
        </View>
      </View>
    );
  }
}

const GradeRow = ({name, result, average}) => (
  <View style={styles.gradeRow}>
    <View style={listStyles.separator} />
    <View style={styles.rowCells}>
      <Text style={styles.gradeCell}>{name}</Text>
      <Text style={styles.gradeCell}>{result}</Text>
      <Text style={styles.gradeCell}>{average || 'N/A'}</Text>
    </View>
  </View>
);

GradeRow.propTypes = {
  name: PropTypes.string,
  result: PropTypes.string,
  average: PropTypes.string,
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: colors.grayLight,
  },
  content: {
    paddingBottom: ios ? 65 : 16,
  },
  session: {
    marginVertical: 8,
    marginHorizontal: 8,
    fontSize: 20,
  },
  noCoursesContainer: {
    alignItems: 'center',
  },
  noCourses: {
    marginTop: 32,
    marginBottom: 8,
    fontSize: 18,
  },
  rowCells: {
    flexDirection: 'row',
  },
  gradeCell: {
    flex: 1,
  },
  headerText: {
    fontWeight: 'bold',
  },
});
