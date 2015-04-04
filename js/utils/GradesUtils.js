/**
 * @flow
 */
'use strict';

var React = require('react-native');
var AsyncStorage = React.AsyncStorage;

var UserServerActionCreators = require('../actions/UserServerActionCreators');
var ApiUtils = require('./ApiUtils');

var KEY_USER_STORE = "user_store";

module.exports = {
	getGrades(session) {
		//TODO: local cache

	},
}
