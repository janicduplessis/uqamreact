/**
 * @flow
 */
import React, {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Button from './widgets/Button';

import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

export default class HomeScreen extends React.Component {
  render() {
    const user = UserStore.getUser().toJS();
    if (!user) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
