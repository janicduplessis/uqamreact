/**
 * @flow
 */
'use strict';

let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

let Dispatcher = require('../dispatcher/Dispatcher');
let GradesConstants = require('../constants/GradesConstants');

let ActionTypes = GradesConstants.ActionTypes;
const CHANGE_EVENT = 'change';

let _grades = [];

let GradesStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT, _grades);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function() {
    return _grades;
  },
});

GradesStore.dispatchToken = Dispatcher.register((action) => {
  switch(action.type) {
  case ActionTypes.RECEIVE_GRADES:
    for(let g of action.grades) {
      let id = getGradeIndex(g);
      if(id >= 0) {
        _grades[id] = g;
      } else {
        _grades.push(g);
      }
    }
    GradesStore.emitChange();
    break;
  }
});

function getGradeIndex(g) {
  for(let i = 0; i < _grades.length; i++) {
    if(_grades[i].code === g.code
        && _grades[i].group === g.group
        && _grades[i].session === g.session) {
      return i;
    }
  }
  return -1;
}

module.exports = GradesStore;
