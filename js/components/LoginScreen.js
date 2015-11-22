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
import {connect} from 'react-redux/native';

import Button from './widgets/Button';
import colors from '../utils/colors';

import {login} from '../actions/actionCreators';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      nip: '',
    };
  }

  doLogin() {
    if (this.state.code === '' || this.state.nip === '') {
      this.loginError();
      return;
    }
    login(this.state.code, this.state.nip);
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

export default connect((state) => {
  return {
    user: state.user,
  };
})(LoginScreen);

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
