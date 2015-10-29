/**
 * @flow
 */
import React, {
  Component,
  View,
} from 'react-native';

import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

import LoginScreen from './LoginScreen';
import MainTabsController from './MainTabsController';

export default class UqamApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
    };
  }

  componentDidMount() {
    UserStore.listen(this.onChange.bind(this));
    UserActions.initLogin();
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      loading: false,
      user: UserStore.getUser(),
    });
  }

  render() {
    if (this.state.loading) {
      return <View />;
    }
    return this.state.user !== null ? <MainTabsController /> : <LoginScreen />;
  }
}
