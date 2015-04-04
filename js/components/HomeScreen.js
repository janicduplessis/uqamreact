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

var Button = require('./widgets/Button');

var UserActionCreators = require('../actions/UserActionCreators');
var UserStore = require('../stores/UserStore');

class HomeScreen extends React.Component {
  render() {
    var user = UserStore.get();
    return (
      <View style={styles.container}>
        <Text>
          Hello, {user.firstName} {user.lastName}!
        </Text>
        <Button onPress={() => {
          UserActionCreators.logout();
        }}>Logout</Button>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
      alignItems: 'center',
  },
});

module.exports = HomeScreen;
