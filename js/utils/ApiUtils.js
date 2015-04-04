/**
 * This module handles sending requests and parsing responses from the *not very
 * nice but better than nothing* mobile.uqam.ca/portail_etudiant api.
 *
 * @flow
 */
'use strict';

const URL_BASE = 'https://mobile.uqam.ca/portail_etudiant';

const URL_LOGIN = URL_BASE + '/proxy_dossier_etud.php';
const URL_GRADES = URL_BASE + '/proxy_resultat.php';

module.exports = {
  login(code, nip) {
    return new Promise((resolve, reject) => {
      let params = {
        'code_perm': code,
        'nip': nip,
        'service': 'authentification',
      };
      client.send('POST', URL_LOGIN, params)
        .then((resp) => {
          if(resp.err) {
            reject(resp.err);
            return;
          }

          let user = {
            firstName: resp['socio']['prenom'],
            lastName: resp['socio']['nom'],
            auth: {
              code: code,
              nip: nip,
            },
          };
          resolve(user);
        }).done();
    });
  },

  getCourses() {
    return new Promise((resolve, reject) => {
      client.send('POST', URL_GRADES)
        .then((resp) => {
          if(resp.err) {
            reject(resp.err);
            return;
          }

          let courses = [];
          for(let session of resp) {
            for(let course of session['cours']) {
              let courseGroup = course['cours_gr'].split('-');
              courses.push({
                name: course['titre'],
                code: courseGroup[0],
                group: courseGroup[1],
                session: getSessionCode(session['session']),
              });
            }
          }
          resolve(courses);
        }).done();
    });
  },

  getGrades(session, code, group) {
    return new Promise((resolve, reject) => {
      let params = {
        'annee': session,
        'sigle': code,
        'groupe': group,
      };
      client.send('POST', URL_GRADES, params)
        .then((resp) => {
          // The result of this is actually nested arrays representing a table of results.
          // There is multiple possible layouts of this data depending on what is visible for
          // this class.
          // We will guess what is what by checking the number of columns in the table.
          let result = {
            code: code,
            group: group,
            session: session,
            grades: [],
            total: {},
          };
          let node0 = resp['0'];
          let node1 = resp['1'];
          let gradeRows = node1 ? node0.slice(1) : node0.slice(2);
          let wGradeRows = node1 ? node1.slice(1) : gradeRows;
          let indexes;
          switch(node0[0].length) {
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
          for(let i = 0; i < wGradeRows.length; i++) {
            let g = gradeRows[i];
            let wg = wGradeRows[i];
            if(wg[0].indexOf('Total') >= 0) {
              result.total.result = wg[indexes.result];
              result.total.average = wg[indexes.average];
              result.total.stdDev = wg[indexes.stdDev];
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
        }).done();
    });
  },

  setAuth(code, nip) {
    client.auth = {
      code: code,
      nip: nip,
    };
  },
};

function getSessionCode(sessionStr) {
  sessionStr = sessionStr.substring(0, sessionStr.length - 1);
  let parts = sessionStr.split(' ');
  let code = parts[1];
  switch(parts[0]) {
  case 'automne':
    code += '3';
    break;
  //TODO: no sure if this is the right value.
  case 'ete':
    code += '2';
    break;
  case 'hiver':
    code += '1';
    break;
  }

  return code;
}

let client = {
  auth: null,

  send(method, url, params) {
    params = params || {};
    let body = null;
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://mobile.uqam.ca',
      'Referer': 'https://mobile.uqam.ca/portail_etudiant/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.36 Safari/537.36',
    };
    // Authenticate requests if the client is logged.
    if(this.auth) {
      params['code_perm'] = this.auth.code;
      params['nip'] = this.auth.nip;
    }

    switch(method) {
    case 'GET':
      if(params) {
        url = url + '?' + this.encodeParams(params);
      }
      break;
    case 'POST':
      body = this.encodeParams(params);
      break;
    default:
      throw new Error('Invalid method: ' + method);
    }

    return fetch(url, {
      method: method,
      headers: headers,
      body: body,
    }).then((resp) => {
      return resp.text();
    }).then((resp) => {
      return JSON.parse(resp.substring(9));
    });
  },

  encodeParams(obj) {
    let str = [];
    for(let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  },
};


