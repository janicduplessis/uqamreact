/**
 * @flow
 */
import React, {
  PropTypes,
  Component,
  ActivityIndicatorIOS,
  PixelRatio,
  ListView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import RefreshableListView from 'react-native-refreshable-listview';

import GradesStore from '../stores/GradesStore';
import GradesActions from '../actions/GradesActions';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class GradesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      grades: ds.cloneWithRows(GradesStore.getGrades().toArray()),
      loading: true,
    };
  }

  componentDidMount() {
    GradesStore.listen(this.onChange.bind(this));
    GradesActions.getGrades('20151');
  }

  componentWillUnmount() {
    GradesStore.unlisten(this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      grades: ds.cloneWithRows(GradesStore.getGrades().toArray()),
      loading: false,
    });
  }

  reload() {
    GradesActions.getGrades('20151');
  }

  renderGrade(g) {
    return <GradeList grades={g.toJS()} />;
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

    return (
      <RefreshableListView
        contentContainerStyle={styles.content}
        style={styles.container}
        dataSource={this.state.grades}
        renderRow={this.renderGrade}
        loadData={this.reload.bind(this)} />
    );
  }
}

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
      <View ref="this" style={{opacity: 0}}>
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  container: {
    backgroundColor: '#eeeeee',
  },
  content: {
    paddingBottom: 16,
  },
  tableHeader: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  tableContent: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
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
