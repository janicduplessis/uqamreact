import ApiUtils from './ApiUtils';

export default {
  getGrades(session, callback) {
    // TODO: local cache
    ApiUtils.getCourses()
      .then((courses) => {
        courses.forEach((c) => {
          if (c.session === session) {
            this.getGradesForCourse(c, callback);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getGradesForCourse(course, callback) {
    ApiUtils.getGrades(course.session, course.code, course.group)
      .then((grades) => {
        callback(grades);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
