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
  PullToRefreshViewAndroid,
  Platform,
} from 'react-native';
import {connect} from 'react-redux/native';
import DialogAndroid from 'react-native-dialogs';

import colors from '../utils/colors';
import Progress from './widgets/Progress';
import Button from './widgets/Button';
import {getGrades, setGradesSession} from '../actions/actionCreators';
import {getCurrentSessions, getSessionName} from '../utils/SessionUtils';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ios = Platform.OS === 'ios';

const sessions = getCurrentSessions(new Date());

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
      refreshing: false,
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
      refreshing: false,
    });
    if (this._endRefreshing) {
      this._endRefreshing();
      this._endRefreshing = null;
    }
  }

  componentWillUnmount() {
    this.props.routeEvents.off('action', this.onActionSelected);
    this._endRefreshing = null;
  }

  onActionSelected = () => {
    const selectedIndex = sessions.findIndex(s => s === this.state.session);
    if (ios) {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Cancel', ...sessions.map(s => getSessionName(s))],
        cancelButtonIndex: 0,
      }, (index) => this.onSessionChange(index - 1));
    } else {
      const dialog = new DialogAndroid();
      dialog.set({
        title: 'Pick a session',
        items: sessions.map(s => getSessionName(s)),
        itemsCallbackSingleChoice: (index) => this.onSessionChange(index),
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

  onRefresh() {
    this.setState({refreshing: true});
    this.onReload();
  }

  onSessionChange(selectedIndex) {
    const session = sessions[selectedIndex];
    if (session !== this.state.session) {
      this.props.dispatch(
        setGradesSession(session),
      );
      this.setState({
        session: sessions[selectedIndex],
        loading: true,
      }, () => {
        this.onReload();
      });
    }
  }

  renderGrade(g) {
    return <GradeList grades={g} />;
  }

  renderHeader() {
    return (
      <View>
        <Text style={styles.listHeader}>
          {getSessionName(sessions.find(s => s === this.state.session))}
        </Text>
      </View>
    );
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
        <View style={{alignItems: 'center'}}>
          <Text style={styles.noCourses}>No courses for this session.</Text>
          <Button
            flat
            onPress={this.onActionSelected.bind(this)}
          >
            Change session
          </Button>
        </View>
      );
    }

    const listView = (
      <ListView
        contentContainerStyle={styles.content}
        style={styles.container}
        dataSource={this.state.dataSource}
        onRefreshStart={(endRefreshing) => {
          this._endRefreshing = endRefreshing;
          this.onRefresh();
        }}
        renderRow={this.renderGrade}
        renderHeader={this.renderHeader.bind(this)}
      />
    );

    if (ios) {
      return (
        <View style={styles.container}>
          {listView}
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <PullToRefreshViewAndroid
          colors={[colors.primary]}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
          style={{flex: 1}}
        >
          {listView}
        </PullToRefreshViewAndroid>
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
    paddingBottom: ios ? 65 : 16,
  },
  listHeader: {
    marginTop: 8,
    marginHorizontal: 8,
    fontSize: 20,
  },
  noCourses: {
    marginTop: 32,
    marginBottom: 8,
    fontSize: 18,
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
