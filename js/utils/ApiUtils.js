/**
 * This module handles sending requests and parsing responses from the *not very
 * nice but better than nothing* mobile.uqam.ca/portail_etudiant api.
 *
 */
import ApiClient from './ApiClient';

const URL_BASE = 'https://mobile.uqam.ca/portail_etudiant';

const URL_LOGIN = URL_BASE + '/proxy_dossier_etud.php';
const URL_GRADES = URL_BASE + '/proxy_resultat.php';
const URL_SCHEDULE = URL_BASE + '/proxy_dossier_etud.php';

function getSessionCode(sessionStr) {
  const parts = sessionStr.substring(0, sessionStr.length - 1).split(' ');
  let code = parts[1];
  switch (parts[0]) {
  case 'automne':
    code += '3';
    break;
  // TODO: no sure if this is the right value.
  case 'ete':
    code += '2';
    break;
  case 'hiver':
    code += '1';
    break;
  default:
    throw Error('Invalid part');
  }

  return code;
}

export default {
  login(code, nip) {
    const params = {
      'code_perm': code,
      'nip': nip,
      'service': 'authentification',
    };
    return ApiClient.send('POST', URL_LOGIN, params)
      .then((resp) => {
        if (resp.err) {
          throw Error(resp.err);
        }

        const user = {
          firstName: resp.socio.prenom,
          lastName: resp.socio.nom,
          auth: {
            code: code,
            nip: nip,
          },
        };
        return {user: user};
      });
  },

  getCourses() {
    return new Promise((resolve, reject) => {
      ApiClient.send('POST', URL_GRADES, null)
        .then((resp) => {
          if (resp.err) {
            reject(resp.err);
            return;
          }

          const courses = [];
          resp.forEach((session) => {
            session.cours.forEach((course) => {
              const courseGroup = course.cours_gr.split('-');
              courses.push({
                name: course.titre,
                code: courseGroup[0],
                group: courseGroup[1],
                session: getSessionCode(session.session),
              });
            });
          });
          resolve(courses);
        })
        .catch(reject);
    });
  },

  getGrades(session, code, group) {
    return new Promise((resolve, reject) => {
      const params = {
        'annee': session,
        'sigle': code,
        'groupe': group,
      };
      ApiClient.send('POST', URL_GRADES, params)
        .then((resp) => {
          // The result of this is actually nested arrays representing a table of results.
          // There is multiple possible layouts of this data depending on what is visible for
          // this class.
          // We will guess what is what by checking the number of columns in the table.
          const result = {
            code: code,
            group: group,
            session: session,
            grades: [],
            total: {},
          };
          const node0 = resp['0'];
          const node1 = resp['1'];
          const gradeRows = node1 ? node0.slice(1) : node0.slice(2);
          const wGradeRows = node1 ? node1.slice(1) : gradeRows;
          let indexes = {
            name: -1,
            result: -1,
            average: -1,
            stdDev: -1,
            wResult: -1,
            wAverage: -1,
            wStdDev: -1,
          };
          switch (node0[0].length) {
          case 3:
            indexes = {
              name: 0,
              result: 1,
              average: -1,
              stdDev: -1,
              wResult: 2,
              wAverage: -1,
              wStdDev: -1,
            };
            break;
          case 4:
            indexes = {
              name: 0,
              result: 1,
              average: 2,
              stdDev: 3,
              wResult: 1,
              wAverage: 2,
              wStdDev: 3,
            };
            break;
          default:
            throw new Error('Unknown results layout');
          }
          for (let i = 0; i < wGradeRows.length; i++) {
            const g = gradeRows[i];
            const wg = wGradeRows[i];
            if (wg[0].indexOf('Total:') >= 0) {
              result.total.result = wg[indexes.result];
              result.total.average = wg[indexes.average];
              result.total.stdDev = wg[indexes.stdDev];
            } else if (wg[0].indexOf('Note:') >= 0) {
              result.final = wg[1];
            } else {
              result.grades.push({
                name: g[indexes.name],
                result: g[indexes.result],
                average: g[indexes.average],
                stdDev: g[indexes.stdDev],
                wResult: wg[indexes.wResult],
                wAverage: wg[indexes.wAverage],
                wStdDev: wg[indexes.wStdDev],
              });
            }
          }
          resolve(result);
        })
        .catch(reject);
    });
  },

  getSchedule() {
    return new Promise((resolve, reject) => {
      const params = {
        service: 'horaire',
      };
      ApiClient.send('POST', URL_SCHEDULE, params)
        .then((resp) => {
          if (resp.err) {
            reject(resp.err);
            return;
          }
          const schedules = resp.trimestre.map((s) => {
            // TODO: support more than one program.
            const coursesNode = s.programme[0].cours;
            const courses = coursesNode.map((c) => {
              const schedule = c.horaire.map((h) => {
                return {
                  start: h.hr_deb,
                  end: h.hr_fin,
                  day: h.jour,
                  local: h.local,
                  note: h.mode_util,
                };
              });
              return {
                title: c.titre,
                code: c.sigle,
                group: c.groupe,
                teacher: c.enseignant[0].nom,
                schedule: schedule,
              };
            });
            return {
              session: s.trim_num,
              courses: courses,
            };
          });
          resolve(schedules);
        })
        .catch(reject)
        .done();
    });
  },
};
