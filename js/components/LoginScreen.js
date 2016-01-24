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
  Text,
  Platform,
  StatusBarIOS,
} from 'react-native';
import {connect} from 'react-redux';

import Button from './widgets/Button';
import colors from '../styles/colors';

import {login} from '../actions/userActions';

const ios = Platform.OS === 'ios';

class LoginScreen extends Component {

  state = {
    code: '',
    nip: '',
  };

  componentDidMount() {
    if (ios) {
      StatusBarIOS.setStyle('default', true);
    }
  }

  doLogin() {
    if (this.state.code === '' || this.state.nip === '') {
      this.loginError();
      return;
    }
    this.props.dispatch(
      login(this.state.code, this.state.nip),
    );
  }

  loginError() {
    this.setState({
      nip: '',
    });
    if (ios) {
      AlertIOS.alert('Error', 'Invalid code or nip.');
    } else {
      ToastAndroid.show('Invalid code or nip.', ToastAndroid.LONG);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>UQAM Portal</Text>
        <View>
          <TextInput
            style={[styles.default, styles.username]}
            underlineColorAndroid={colors.primary}
            placeholder="Code"
            autoCorrect={false}
            autoCapitalize="characters"
            returnKeyType="next"
            maxLength={12}
            value={this.state.code}
            onChange={(event) => this.setState({code: event.nativeEvent.text})}
          />
          <TextInput
            style={[styles.default, styles.password]}
            underlineColorAndroid={colors.primary}
            placeholder="Nip"
            password
            keyboardType="numeric"
            returnKeyType="go"
            maxLength={20}
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

export default connect((state) => ({
  user: state.user,
}))(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 8,
  },
  title: {
    marginTop: 32,
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textDark,
    textAlign: 'center',
  },
  default: {
    height: 54,
    borderColor: colors.grayMedium,
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 12,
  },
  username: {
    marginTop: 50,
  },
  password: {
    marginTop: 16,
    marginBottom: 16,
  },
});
