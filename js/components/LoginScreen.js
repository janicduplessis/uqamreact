/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} = React;

var Button = require('./widgets/Button');

var UserActionCreators = require('../actions/UserActionCreators');

class LoginScreen extends React.Component {
  code: string;
  nip: string;

  constructor() {
    this.code = '';
    this.nip = '';
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={[styles.default, styles.username]}
            placeholder="Code"
            autoCorrect={false}
            onChange={(event) => this.code = event.nativeEvent.text}
          />
          <TextInput
            style={[styles.default, styles.password]}
            placeholder="Nip"
            onChange={(event) => this.nip = event.nativeEvent.text}
          />

          <Button
            onPress={() => {
              this.doLogin();
            }}>
            Connect
          </Button>
        </View>
      </View>
    );
  }
  doLogin() {
    if(this.code === '' || this.nip === '') {
      return;
    }
    UserActionCreators.login({code: this.code, nip: this.nip});
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8
  },
  default: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 3,
    borderWidth: 1,
    height: 30,
    paddingLeft: 8,
  },
  username: {
    marginTop: 75,
  },
  password: {
    marginTop: 8,
  },
});

module.exports = LoginScreen;
