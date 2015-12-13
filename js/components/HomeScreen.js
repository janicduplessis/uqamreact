/**
 * @flow
 */
import React, {
  Component,
  PropTypes,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux/native';

import {logout} from '../actions/actionCreators';
import Button from './widgets/Button';

export default class HomeScreen extends Component {
  onLogout() {
    this.props.dispatch(
      logout(),
    );
  }

  render() {
    const {user} = this.props;
    return (
      <View style={styles.container}>
        <Text>
          Hello, {user.firstName} {user.lastName}!
        </Text>
        <Button flat onPress={() => this.onLogout()}>Logout</Button>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect((state) => {
  return {
    user: state.user,
  };
})(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
