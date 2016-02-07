/**
 * @flow
 */

import ApiUtils from './ApiUtils';

export default class GradeUtils {
  static getGrades(session) {
    // TODO: local cache
    return ApiUtils.getCourses()
      .then((courses) =>
        Promise.all(
          courses.filter(c => c.session === session)
            .map(c => this.getGradesForCourse(c))
        )
      );
  }
  static getGradesForCourse(course) {
    return ApiUtils.getGrades(course.session, course.code, course.group);
  }
}
