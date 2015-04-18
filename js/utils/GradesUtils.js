/**
 * @flow
 */
'use strict';

var GradesServerActionCreators = require('../actions/GradesServerActionCreators');
var ApiUtils = require('./ApiUtils');


module.exports = {
  getGrades(session: string) {
    //TODO: local cache
    ApiUtils.getCourses()
      .then((courses) => {
        courses.forEach((c) => {
           if(c.session === session) {
            this.getGradesForCourse(c);
          }
        });
      })
      .catch((error) => {

      });
  },
  getGradesForCourse(course: any) {
    ApiUtils.getGrades(course.session, course.code, course.group)
      .then((grades) => {
        GradesServerActionCreators.receiveGrades([grades], null);
      })
      .catch((error) => {

      });
  },
};
