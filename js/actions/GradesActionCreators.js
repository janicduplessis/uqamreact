/**
 * @flow
 */
'use strict';

let Dispatcher = require('../dispatcher/Dispatcher');
let GradesConstants = require('../constants/GradesConstants');
let GradesUtils = require('../utils/GradesUtils');

let ActionTypes = GradesConstants.ActionTypes;

module.exports = {
  getGrades() {
    Dispatcher.dispatch({
      type: ActionTypes.GET_GRADES,
    });
    GradesUtils.getGrades();
  },
};
