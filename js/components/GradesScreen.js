/**
 * @flow
 */
'use strict';

let React = require('react-native');
let {
  ActivityIndicatorIOS,
  PixelRatio,
  StyleSheet,
  ScrollView,
  View,
  Text,
} = React;

let GradesActionCreators = require('../actions/GradesActionCreators');
let GradesStore = require('../stores/GradesStore');

class GradesScreen extends React.Component {
  constructor() {
    this.state = {
      loading: true,
      grades: null,
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
      let gradeLists = [];
      for(let g of this.state.grades) {
        gradeLists.push(<GradeList grades={g} />);
      }
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
  render() {
    let grades = this.props.grades;
    let rows = [];
    for(let g of grades.grades) {
      rows.push(
        <View style={styles.gradeRow}>
          <View style={styles.separator} />
          <View style={styles.rowCells}>
            <Text style={styles.gradeCell}>{g.name}</Text>
            <Text style={styles.gradeCell}>{g.result}</Text>
            <Text style={styles.gradeCell}>{g.average || 'N/A'}</Text>
          </View>
        </View>
      );
    }
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
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
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
