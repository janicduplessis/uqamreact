/**
 * @flow
 */
'use strict';

let React = require('react-native');

let GradesServerActionCreators = require('../actions/GradesServerActionCreators');
let ApiUtils = require('./ApiUtils');


module.exports = {
  getGrades(session) {
    //TODO: local cache
    ApiUtils.getCourses()
      .then((courses) => {
        //GradesServerActionCreators.receiveGrades(courses);
      })
      .catch((error) => {

      });
    ApiUtils.getGrades('20151', 'INF2120', '10')
      .then((grades) => {

      })
      .catch((error) => {

      });
  },
};
