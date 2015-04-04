/**
 * @flow
 */
'use strict';

let React = require('react-native');
let {
  StyleSheet,
  View,
  Text,
} = React;

let GradesActionCreators = require('../actions/GradesActionCreators');

class GradesScreen extends React.Component {
  constructor() {

  }

  componentDidMount() {
    GradesActionCreators.getGrades();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Grades
        </Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
      alignItems: 'center',
  },
});

module.exports = GradesScreen;
