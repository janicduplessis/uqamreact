/**
 * @flow
 */
'use strict';

let keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    LOGIN: null,
    LOGOUT: null,
    RECEIVE_USER: null,
  }),

};
