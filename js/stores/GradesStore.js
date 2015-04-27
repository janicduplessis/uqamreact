'use strict';

var {
  fromJS,
  List,
} = require('immutable');

var {
  Flux,
  Store,
} = require('../Flux');

var GradesActions = require('../actions/GradesActions');

class GradesStore extends Store {
  constructor() {
    super();

    this.register(GradesActions.receiveGrades, this.receiveGrades);

    this.state = {
      grades: new List(),
    };
  }

  getGrades() {
    return this.state.grades;
  }

  receiveGrades(grades) {
    var newGrades = this.state.grades.withMutations((list) => {
      grades.forEach((curGrade) => {
        var index = list.findIndex((g) => g.code === curGrade.code);
        var item = fromJS(curGrade);
        if(index < 0) {
          list.push(item);
        } else {
          list.update(index, item);
        }
      });

      list.sort((a, b) => a.code < b.code ? -1 : 1);
    });

    this.setState({
      grades: newGrades,
    });
  }
}

module.exports = Flux.createStore('grades', GradesStore);


