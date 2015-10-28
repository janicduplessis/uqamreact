/**
 * @flow
 */
'use strict';

var GradesStore = require('../stores/GradesStore');
var GradesActions = require('../actions/GradesActions');

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  PixelRatio,
  ListView,
  StyleSheet,
  View,
  Text,
} = React;

var RefreshableListView = require('react-native-refreshable-listview');
var AnimationExperimental = require('AnimationExperimental');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class GradesScreen extends React.Component {

  constructor() {
    this.state = {
      grades: ds.cloneWithRows(GradesStore.getGrades().toArray()),
      loading: true,
    };
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

  componentDidMount() {
    GradesStore.listen(this.onChange.bind(this));
    GradesActions.getGrades('20151');
  }

  componentWillUnmount() {
    GradesStore.unlisten(this.onChange.bind(this));
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

class GradeList extends React.Component {

  componentDidMount() {
    AnimationExperimental.startAnimation({
        node: this.refs['this'],
        duration: 300,
        easing: 'easeInOutQuad',
        property: 'opacity',
        toValue: 1,
      });
  }

  render() {
    var grades = this.props.grades;
    var rows = grades.grades.map((g, i) => {
      return (
        <GradeRow
          key={i}
          name={g.name}
          result={g.result}
          average={g.average} />
      );
    });

    var final = grades.final ?
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

class GradeRow extends React.Component {
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

var styles = StyleSheet.create({
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

module.exports = GradesScreen;
