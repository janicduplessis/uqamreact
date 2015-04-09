/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  PixelRatio,
  StyleSheet,
  ScrollView,
  View,
  Text,
} = React;

var AnimationExperimental = require('AnimationExperimental');

var GradesActionCreators = require('../actions/GradesActionCreators');
var GradesStore = require('../stores/GradesStore');

class GradesScreen extends React.Component {
  constructor() {
    this.state = {
      loading: true,
      grades: [],
    };

    GradesStore.addChangeListener((grades) => {
      this.setState({
        loading: false,
        grades: grades,
      });
    });
  }

  componentDidMount() {
    GradesActionCreators.getGrades('20151');
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

    var gradeLists = this.state.grades.map((g, i) => {
      return <GradeList key={i} grades={g} />;
    });

    return (
      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.container}>
        {gradeLists}
      </ScrollView>
    );
  }
}

class GradeList extends React.Component {

  componentDidMount() {
    requestAnimationFrame(() => {
      AnimationExperimental.startAnimation(this.refs['this'], 300, 0, 'easeInOutQuad', {opacity: 1});
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
