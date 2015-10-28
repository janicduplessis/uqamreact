/**
 * This module handles sending requests and parsing responses from the *not very
 * nice but better than nothing* mobile.uqam.ca/portail_etudiant api.
 *
 */
'use strict';

var URL_BASE = 'https://mobile.uqam.ca/portail_etudiant';

var URL_LOGIN = URL_BASE + '/proxy_dossier_etud.php';
var URL_GRADES = URL_BASE + '/proxy_resultat.php';
var URL_SCHEDULE = URL_BASE + '/proxy_dossier_etud.php';

module.exports = {
  login(code, nip) {
    return new Promise((resolve, reject) => {
      var params = {
        'code_perm': code,
        'nip': nip,
        'service': 'authentification',
      };
      client.send('POST', URL_LOGIN, params)
        .then((resp) => {
          if(resp.err) {
            resolve({user: null, error: resp.err});
            return;
          }

          var user = {
            firstName: resp['socio']['prenom'],
            lastName: resp['socio']['nom'],
            auth: {
              code: code,
              nip: nip,
            },
          };
          resolve({user: user, error: null});
        })
        .catch(reject)
        .done();
    });
  },

  getCourses() {
    return new Promise((resolve, reject) => {
      client.send('POST', URL_GRADES, null)
        .then((resp) => {
          if(resp.err) {
            reject(resp.err);
            return;
          }

          var courses = [];
          resp.forEach((session) => {
            session['cours'].forEach((course) => {
              var courseGroup = course['cours_gr'].split('-');
              courses.push({
                name: course['titre'],
                code: courseGroup[0],
                group: courseGroup[1],
                session: getSessionCode(session['session']),
              });
            });
          });
          resolve(courses);
        })
        .catch(reject)
        .done();
    });
  },

  getGrades(session, code, group) {
    return new Promise((resolve, reject) => {
      var params = {
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
          var result = {
            code: code,
            group: group,
            session: session,
            grades: [],
            total: {},
          };
          var node0 = resp['0'];
          var node1 = resp['1'];
          var gradeRows = node1 ? node0.slice(1) : node0.slice(2);
          var wGradeRows = node1 ? node1.slice(1) : gradeRows;
          var indexes = {
            name: -1,
            result: -1,
            average: -1,
            stdDev: -1,
            wResult: -1,
            wAverage: -1,
            wStdDev: -1,
          };
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
          for(var i = 0; i < wGradeRows.length; i++) {
            var g = gradeRows[i];
            var wg = wGradeRows[i];
            if(wg[0].indexOf('Total:') >= 0) {
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
        .catch(reject)
        .done();
    });
  },

  getSchedule() {
    return new Promise((resolve, reject) => {
      var params = {
        service: 'horaire',
      };
      client.send('POST', URL_SCHEDULE, params)
        .then((resp) => {
          if(resp.err) {
            reject(resp.err);
            return;
          }
          var schedules = resp['trimestre'].map((s) => {
            //TODO: support more than one program.
            var coursesNode = s['programme'][0]['cours'];
            var courses = coursesNode.map((c) => {
              var schedule = c['horaire'].map((h) => {
                return {
                  start: h['hr_deb'],
                  end: h['hr_fin'],
                  day: h['jour'],
                  local: h['local'],
                  note: h['mode_util'],
                };
              });
              return {
                title: c['titre'],
                code: c['sigle'],
                group: c['groupe'],
                teacher: c['enseignant'][0]['nom'],
                schedule: schedule,
              };
            });
            return {
              session: s['trim_num'],
              courses: courses,
            };
          });
          resolve(schedules);
        })
        .catch(reject)
        .done();
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
  var parts = sessionStr.split(' ');
  var code = parts[1];
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

var client = {
  auth: null,

  send(method, url, params: any) {
    params = params || {};
    var body = null;
    var headers = {
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
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  },
};


