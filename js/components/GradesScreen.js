/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
} = React;

class GradesScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Grades
        </Text>
      </View>
    )
  }
}

var styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
      alignItems: 'center',
  }
}

module.exports = GradesScreen;
