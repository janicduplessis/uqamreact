import ApiUtils from './ApiUtils';

export default {
  getGrades(session) {
    // TODO: local cache
    return ApiUtils.getCourses()
      .then((courses) => {
        return Promise.all(
          courses.filter(c => c.session === session)
            .map(c => this.getGradesForCourse(c))
        );
      });
  },
  getGradesForCourse(course) {
    return ApiUtils.getGrades(course.session, course.code, course.group);
  },
};
