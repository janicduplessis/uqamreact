/**
 * @flow
 */
'use strict';

let React = require('react-native');
let AsyncStorage = React.AsyncStorage;

let UserServerActionCreators = require('../actions/UserServerActionCreators');
let ApiUtils = require('./ApiUtils');

const KEY_USER_STORE = 'user_store';

module.exports = {
	getCurrentUser() {
		AsyncStorage.getItem(KEY_USER_STORE, (error, result) => {
			if(error !== null) {
				// Uh error?
				throw new Error(error);
			}
			let user = JSON.parse(result);
			if(user && user.auth) {
				ApiUtils.setAuth(user.auth.code, user.auth.nip);
			}
			UserServerActionCreators.receiveUser(user, null);
		});
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
