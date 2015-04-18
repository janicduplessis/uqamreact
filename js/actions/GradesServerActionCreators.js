/**
 * @flow
 */
'use strict';

var Dispatcher = require('../dispatcher/Dispatcher');
var GradesConstants = require('../constants/GradesConstants');

var ActionTypes = GradesConstants.ActionTypes;

module.exports = {
	receiveGrades(grades: any, error: Error) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_GRADES,
      grades: grades,
      error: error,
    });
  },
};
