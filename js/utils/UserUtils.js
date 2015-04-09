/**
 * @flow
 */
'use strict';

var React = require('react-native');
var AsyncStorage = React.AsyncStorage;

var UserServerActionCreators = require('../actions/UserServerActionCreators');
var ApiUtils = require('./ApiUtils');

var KEY_USER_STORE = 'user_store';

module.exports = {
	getCurrentUser() {
		AsyncStorage.getItem(KEY_USER_STORE).then((result) => {
			var user = JSON.parse(result);
			if(user && user.auth) {
				ApiUtils.setAuth(user.auth.code, user.auth.nip);
			}
			UserServerActionCreators.receiveUser(user, null);
		}).catch((error) => {

		}).done();
	},

	login(loginInfo) {
		ApiUtils.login(loginInfo.code, loginInfo.nip)
			.then((user) => {
				if(user && user.auth) {
					ApiUtils.setAuth(user.auth.code, user.auth.nip);
				}
				UserServerActionCreators.receiveUser(user, null);
				AsyncStorage.setItem(KEY_USER_STORE, JSON.stringify(user));
			}).catch((error) => {
				UserServerActionCreators.receiveUser(null, error);
			});
	},

	logout() {
		UserServerActionCreators.receiveUser(null, null);
		AsyncStorage.removeItem(KEY_USER_STORE);
	},
};
