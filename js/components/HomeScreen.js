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

var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

class HomeScreen extends React.Component {
  render() {
    var user = UserStore.getUser().toJS();
    if(!user) {
      return <View />;
    }
    return (
      <View style={styles.container}>
        <Text>
          Hello, {user.firstName} {user.lastName}!
        </Text>
        <Button onPress={() => UserActions.logout()}>Logout</Button>
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
