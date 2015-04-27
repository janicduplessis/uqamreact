'use strict';

var React = require('react-native');
var AsyncStorage = React.AsyncStorage;

var ApiUtils = require('./ApiUtils');

var KEY_USER_STORE = 'user_store';

module.exports = {
	getCurrentUser() {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem(KEY_USER_STORE).then((result) => {
				var user = JSON.parse(result);
				if(user && user.auth) {
					ApiUtils.setAuth(user.auth.code, user.auth.nip);
				}
				resolve(user, null);
			}).catch((error) => {
				reject(error);
			}).done();
		});
	},

	login(loginInfo) {
		return ApiUtils.login(loginInfo.code, loginInfo.nip)
				.then((userErr) => {
					var {user, error} = userErr;
					if(user && user.auth && !error) {
						ApiUtils.setAuth(user.auth.code, user.auth.nip);
					}
					AsyncStorage.setItem(KEY_USER_STORE, JSON.stringify(user));
					return Promise.resolve(userErr);
				});
	},

	logout() {
		AsyncStorage.removeItem(KEY_USER_STORE);
	},
};
