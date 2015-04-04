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

  getGrades(session, course, group) {
    return new Promise((resolve, reject) => {
      let params = {
        'annee': session,
        'sigle': course,
        'groupe': group,
      };
      client.send('POST', URL_GRADES, params)
        .then((resp) => {

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


