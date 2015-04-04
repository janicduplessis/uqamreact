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

let Button = require('./widgets/Button');

let UserActionCreators = require('../actions/UserActionCreators');
let UserStore = require('../stores/UserStore');

class HomeScreen extends React.Component {
  render() {
    let user = UserStore.get();
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

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
      alignItems: 'center',
  },
});

module.exports = HomeScreen;
