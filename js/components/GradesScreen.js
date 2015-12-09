/**
 * @flow
 */
import React, {
  PropTypes,
  Component,
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
import {getGrades} from '../actions/actionCreators';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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

  constructor(props) {
    super(props);
    this.state = {
      session: '20151',
      dataSource: ds.cloneWithRows(props.grades),
      loading: true,
    };
  }

  componentDidMount() {
    this.props.routeEvents.on('action', () => this.onActionSelected());
    this.onReload();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: ds.cloneWithRows(newProps.grades),
      loading: false,
    });
  }

  onActionSelected() {
    const test = new DialogAndroid();
    test.set({
      title: 'Pick a session',
      items: sessions.map(s => s.title),
      itemsCallbackSingleChoice: (selectedIndex) => {
        this.setState({
          session: sessions[selectedIndex].value,
        }, () => {
          this.onReload();
        });
      },
      selectedIndex: 0,
    });
    test.show();
  }

  onReload() {
    this.props.dispatch(
      getGrades(this.state.session),
    );
  }

  onSessionChange(session) {
    this.setState({
      session,
    }, () => {
      this.onReload();
    });
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

GradesScreen.propTypes = {
  grades: PropTypes.array,
};

export default connect((state) => ({
  grades: state.grades,
}))(GradesScreen);

class GradeList extends Component {

  render() {
    const grades = this.props.grades;
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
GradeList.propTypes = {
  grades: PropTypes.array.isRequired,
};

class GradeRow extends Component {

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

GradeRow.propTypes = {
  name: PropTypes.string,
  result: PropTypes.string,
  average: PropTypes.string,
};
const ios = Platform.OS === 'ios';
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
