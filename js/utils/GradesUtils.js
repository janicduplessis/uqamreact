/**
 * @flow
 */
'use strict';

let GradesServerActionCreators = require('../actions/GradesServerActionCreators');
let ApiUtils = require('./ApiUtils');


module.exports = {
  getGrades(session) {
    //TODO: local cache
    ApiUtils.getCourses()
      .then((courses) => {
        for(let c of courses) {
          if(c.session === session) {
            this.getGradesForCourse(c);
          }
        }
      })
      .catch((error) => {

      });
  },
  getGradesForCourse(course) {
    ApiUtils.getGrades(course.session, course.code, course.group)
      .then((grades) => {
        GradesServerActionCreators.receiveGrades([grades]);
      })
      .catch((error) => {

      });
  },
};
