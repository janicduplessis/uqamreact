/**
 * @flow
 */
import React, {
  PropTypes,
  Component,
  ActionSheetIOS,
  PixelRatio,
  ListView,
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import {connect} from 'react-redux/native';
import DialogAndroid from 'react-native-dialogs';

import colors from '../utils/colors';
import Progress from './widgets/Progress';
import {getGrades, setGradesSession} from '../actions/actionCreators';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ios = Platform.OS === 'ios';

const sessions = [{
  title: 'Winter 2015',
  value: '20151',
}, {
  title: 'Summer 2015',
  value: '20152',
}, {
  title: 'Fall 2015',
  value: '20153',
}, {
  title: 'Winter 2016',
  value: '20161',
}];

class GradesScreen extends Component {

  static propTypes = {
    grades: PropTypes.array,
    session: PropTypes.string,
    routeEvents: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      session: props.session,
      dataSource: ds.cloneWithRows(props.grades),
      loading: true,
    };
  }

  componentDidMount() {
    this.props.routeEvents.on('action', this.onActionSelected);
    this.onReload();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: ds.cloneWithRows(newProps.grades),
      loading: false,
    });
  }

  componentWillUnmount() {
    this.props.routeEvents.off('action', this.onActionSelected);
  }

  onActionSelected = () => {
    const selectedIndex = sessions.findIndex(s => s.value === this.state.session);
    if (ios) {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Cancel', ...sessions.map(s => s.title)],
        cancelButtonIndex: 0,
      }, this.onSessionChange.bind(this));
    } else {
      const dialog = new DialogAndroid();
      dialog.set({
        title: 'Pick a session',
        items: sessions.map(s => s.title),
        itemsCallbackSingleChoice: this.onSessionChange.bind(this),
        selectedIndex: selectedIndex,
      });
      dialog.show();
    }
  }

  onReload() {
    this.props.dispatch(
      getGrades(this.state.session),
    );
  }

  onSessionChange(selectedIndex) {
    const session = sessions[selectedIndex].value;
    if (session !== this.state.session) {
      this.props.dispatch(
        setGradesSession(session),
      );
      this.setState({
        session: sessions[selectedIndex].value,
        loading: true,
      }, () => {
        this.onReload();
      });
    }
  }

  renderGrade(g) {
    return <GradeList grades={g} />;
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.center}>
          <Progress />
        </View>
      );
    }

    if (!this.props.grades.length) {
      return (
        <View>
          <Text>No courses for this session.</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.content}
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={this.renderGrade}
        />
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
        <View>
          <View style={styles.tableHeader}>
            <Text>{grades.code} - {grades.group}</Text>
          </View>
          <View style={[styles.tableContent, styles.gradeRow]}>
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
      <View>
        <View style={styles.tableHeader}>
          <Text>{grades.code} - {grades.group}</Text>
        </View>
        <View style={styles.tableContent}>
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

class GradeRow extends Component {

  static propTypes = {
    name: PropTypes.string,
    result: PropTypes.string,
    average: PropTypes.string,
  };

  render() {
    return (
      <View style={styles.gradeRow}>
        <View style={styles.separator} />
        <View style={styles.rowCells}>
          <Text style={styles.gradeCell}>{this.props.name}</Text>
          <Text style={styles.gradeCell}>{this.props.result}</Text>
          <Text style={styles.gradeCell}>{this.props.average || 'N/A'}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
  },
  container: {
    flex: 1,
    backgroundColor: colors.grayLight,
  },
  content: {
    paddingTop: ios ? 64 : 0,
    paddingBottom: ios ? 65 : 16,
  },
  tableHeader: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  tableContent: {
    backgroundColor: colors.white,
    borderColor: colors.grayMedium,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  gradeRow: {
    paddingHorizontal: 8,
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
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
    marginVertical: 8,
  },
});
