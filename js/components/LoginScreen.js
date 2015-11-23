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
  StatusBarIOS,
} from 'react-native';
import {connect} from 'react-redux/native';

import Button from './widgets/Button';
import colors from '../utils/colors';

import {login} from '../actions/actionCreators';

const ios = Platform.OS === 'ios';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      nip: '',
    };
  }

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
    backgroundColor: colors.white,
    padding: 8,
  },
  default: {
    height: 54,
    borderColor: colors.grayMedium,
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 12,
  },
  username: {
    marginTop: 75,
  },
  password: {
    marginTop: 16,
    marginBottom: 16,
  },
});
