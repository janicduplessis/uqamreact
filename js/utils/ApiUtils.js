/**
 * This module handles sending requests and parsing responses from the *not very
 * nice but better than nothing* mobile.uqam.ca/portail_etudiant api.
 *
 * @flow
 */
import ApiClient from './ApiClient';

const URL_BASE = 'https://mobile.uqam.ca/portail_etudiant';

const URL_LOGIN = `${URL_BASE}/proxy_dossier_etud.php`;
const URL_GRADES = `${URL_BASE}/proxy_resultat.php`;
const URL_SCHEDULE = `${URL_BASE}/proxy_dossier_etud.php`;

function getSessionCode(sessionStr: string): string {
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

export default class ApiUtils {
  static async login(code: string, nip: string): Promise {
    const params = {
      code_perm: code,
      nip,
      service: 'authentification',
    };
    const resp = await ApiClient.send('POST', URL_LOGIN, params);
    if (resp.err) {
      throw Error(resp.err);
    }

    const user = {
      firstName: resp.socio.prenom,
      lastName: resp.socio.nom,
      auth: {
        code,
        nip,
      },
    };

    return user;
  }

  static async getCourses() {
    const resp = await ApiClient.send('POST', URL_GRADES);
    if (resp.err) {
      throw new Error(resp.err);
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
    return courses;
  }

  static async getGrades(session: string, code: string, group: string): Promise {
    const params = {
      annee: session,
      sigle: code,
      groupe: group,
    };
    const resp = await ApiClient.send('POST', URL_GRADES, params);
    // The result of this is actually nested arrays representing a table of results.
    // There is multiple possible layouts of this data depending on what is visible for
    // this class.
    // We will guess what is what by checking the number of columns in the table.
    const result = {
      code,
      group,
      session,
      grades: [],
      total: {},
    };
    const node0 = resp['0'];
    if (!node0) {
      return result;
    }
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
      if (wg[0].match(/^Total.*:/g)) {
        result.total.result = wg[indexes.result];
        result.total.average = wg[indexes.average];
        result.total.stdDev = wg[indexes.stdDev];
      } else if (wg[0].match(/^Note.*:/g)) {
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
    return result;
  }

  static async getSchedule(): Promise {
    const params = {
      service: 'horaire',
    };
    const resp = await ApiClient.send('POST', URL_SCHEDULE, params);
    if (resp.err) {
      throw new Error(resp.err);
    }
    const schedules = resp.trimestre.map((s) => {
      // TODO: support more than one program.
      const coursesNode = s.programme[0].cours;
      const courses = coursesNode.map((c) => {
        const schedule = [];
        c.horaire.forEach((h) => {
          const newPeriod = {
            start: h.hr_deb,
            end: h.hr_fin,
            day: h.jour,
            locals: [h.local],
            note: h.mode_util,
          };
          // Sometimes we have the same period multiple times in different locals.
          const samePeriod = schedule.find(p => p.start === newPeriod.start &&
              p.end === newPeriod.end && p.day === newPeriod.day);
          if (samePeriod) {
            samePeriod.locals.push(h.local);
          } else {
            schedule.push(newPeriod);
          }
        });
        return {
          title: c.titre,
          code: c.sigle,
          group: c.groupe,
          teacher: c.enseignant[0].nom,
          schedule,
        };
      });
      return {
        session: s.trim_num,
        courses,
      };
    });
    return schedules;
  }
}
