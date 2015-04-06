/**
 * @flow
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Dispatcher = require('../dispatcher/Dispatcher');
var GradesConstants = require('../constants/GradesConstants');

var ActionTypes = GradesConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _grades = [];

var GradesStore = assign({}, EventEmitter.prototype, {
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
    for(var g of action.grades) {
      var id = getGradeIndex(g);
      if(id >= 0) {
        _grades[id] = g;
      } else {
        _grades.push(g);
      }
    }

    _grades.sort((a, b) => a.code < b.code ? -1 : 1);

    GradesStore.emitChange();
    break;
  }
});

function getGradeIndex(g) {
  for(var i = 0; i < _grades.length; i++) {
    if(_grades[i].code === g.code
        && _grades[i].group === g.group
        && _grades[i].session === g.session) {
      return i;
    }
  }
  return -1;
}

module.exports = GradesStore;
