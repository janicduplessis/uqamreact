/**
 * @flow
 */
import React, {
  Component,
  AlertIOS,
  ToastAndroid,
  StyleSheet,
  View,
  TextInput,
  Platform,
} from 'react-native';

import Button from './widgets/Button';
import colors from '../utils/colors';

import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

export default class LoginScreen extends Component {
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
    if (UserStore.getError()) {
      this.loginError();
    }
  }

  doLogin() {
    if (this.state.code === '' || this.state.nip === '') {
      this.loginError();
      return;
    }
    UserActions.login({code: this.state.code, nip: this.state.nip});
  }

  loginError() {
    this.setState({
      nip: '',
    });
    if (Platform.OS === 'ios') {
      AlertIOS.alert('Error', 'Invalid code or nip.');
    } else {
      ToastAndroid.show('Invalid code or nip.', ToastAndroid.LONG);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={[styles.default, styles.username]}
            underlineColorAndroid={colors.primary}
            placeholder="Code"
            autoCorrect={false}
            value={this.state.code}
            onChange={(event) => this.setState({code: event.nativeEvent.text})}
          />
          <TextInput
            style={[styles.default, styles.password]}
            underlineColorAndroid={colors.primary}
            placeholder="Nip"
            password
            value={this.state.nip}
            onChange={(event) => this.setState({nip: event.nativeEvent.text})}
          />
          <Button
            onPress={() => this.doLogin()}
          >
            Connect
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  default: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  username: {
    marginTop: 75,
  },
  password: {
    marginTop: 8,
  },
});
