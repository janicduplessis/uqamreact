'use strict';

var {
  fromJS,
} = require('immutable');

var {
  Flux,
  Store,
} = require('../Flux');

var UserActions = require('../actions/UserActions');

class UserStore extends Store {
  constructor() {
    super();

    this.register(UserActions.receiveUser, this.receiveUser);

    this.state = {
      user: null,
      error: null,
    };
  }

  getUser() {
    return this.state.user;
  }

  getError() {
    return this.state.error;
  }

  receiveUser({user, error}) {
    this.setState({
      user: fromJS(user),
      error: error,
    });
  }
}

module.exports = Flux.createStore('user', UserStore);
