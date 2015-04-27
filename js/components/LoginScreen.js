/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  AlertIOS,
  StyleSheet,
  View,
  TextInput,
} = React;

var Button = require('./widgets/Button');

var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      nip: '',
    };
  }

  componentDidMount() {
    UserStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange.bind(this));
  }

  onChange() {
    if(UserStore.getError()) {
      this.loginError();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={[styles.default, styles.username]}
            placeholder="Code"
            autoCorrect={false}
            value={this.state.code}
            onChange={(event) => this.setState({code: event.nativeEvent.text})}
          />
          <TextInput
            style={[styles.default, styles.password]}
            placeholder="Nip"
            password={true}
            value={this.state.nip}
            onChange={(event) => this.setState({nip: event.nativeEvent.text})}
          />

          <Button
            onPress={() => this.doLogin()}>
            Connect
          </Button>
        </View>
      </View>
    );
  }

  doLogin() {
    if(this.state.code === '' || this.state.nip === '') {
      this.loginError();
      return;
    }
    UserActions.login({code: this.state.code, nip: this.state.nip});
  }

  loginError() {
    this.setState({
      nip: '',
    });
    AlertIOS.alert('Error', 'Invalid code or nip.');
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
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
