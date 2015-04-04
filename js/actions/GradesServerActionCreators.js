/**
 * @flow
 */
'use strict';

let Dispatcher = require('../dispatcher/Dispatcher');
let GradesConstants = require('../constants/GradesConstants');

let ActionTypes = GradesConstants.ActionTypes;

module.exports = {
	receiveGrades(grades, error) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_GRADES,
      grades: grades,
      error: error,
    });
  },
};
