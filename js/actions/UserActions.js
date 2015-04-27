'use strict';

var invariant = require('invariant');

var {
  Flux,
  Actions,
} = require('../Flux');

var UserUtils = require('../utils/UserUtils');

class UserActions extends Actions {

  initLogin(){
    UserUtils.getCurrentUser()
    .then((user) => {
      this.receiveUser({user: user, error: null});
    })
    .catch((error) => {
      invariant(false, 'Unhandled error occured. %s', error);
    });
  }

  login(loginInfo) {
    UserUtils.login(loginInfo)
    .then((userErr) => {
      this.receiveUser(userErr);
    })
    .catch((error) => {
      invariant(false, 'Unhandled error occured. %s', error);
    });

    return loginInfo;
  }

  logout() {
    UserUtils.logout();
    this.receiveUser();
  }

  receiveUser(userErr) {
    return userErr;
  }
}

module.exports = Flux.createActions('user', UserActions);
