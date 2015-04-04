/**
 * @flow
 */
'use strict';

var Dispatcher = require('../dispatcher/Dispatcher');
var GradesConstants = require('../constants/GradesConstants');
var GradesUtils = require('../utils/GradesUtils');

var ActionTypes = GradesConstants.ActionTypes;

module.exports = {
  getGrades(session) {
    Dispatcher.dispatch({
      type: ActionTypes.GET_GRADES,
    });
    GradesUtils.getGrades(session);
  },
};
