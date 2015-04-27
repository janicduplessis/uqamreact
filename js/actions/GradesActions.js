'use strict';

var {
  Flux,
  Actions,
} = require('../Flux');

var GradesUtils = require('../utils/GradesUtils');

class GradesActions extends Actions {

    getGrades(session){
        GradesUtils.getGrades(session, (grades) => this.receiveGrades([grades]));
    }

    receiveGrades(grades) {
      return grades;
    }
}

module.exports = Flux.createActions('grades', GradesActions);
