export default {
  auth: null,
  send(method: string, url: string, params: any = {}) {
    let body = null;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://mobile.uqam.ca',
      'Referer': 'https://mobile.uqam.ca/portail_etudiant/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.36 Safari/537.36',
    };
    // Authenticate requests if the client is logged.
    if (this.auth) {
      params.code_perm = this.auth.code;
      params.nip = this.auth.nip;
    }

    let requestURL = url;
    switch (method) {
    case 'GET':
      if (params) {
        requestURL = url + '?' + this._encodeParams(params);
      }
      break;
    case 'POST':
      body = this._encodeParams(params);
      break;
    default:
      throw new Error('Invalid method: ' + method);
    }

    return fetch(requestURL, {
      method: method,
      headers: headers,
      body: body,
    }).then((resp) => {
      return resp.text();
    }).then((resp) => {
      return JSON.parse(resp.substring(9));
    });
  },

  setAuth(code, nip) {
    this.auth = {
      code: code,
      nip: nip,
    };
  },

  _encodeParams(obj) {
    const str = [];
    for (const prop in obj)
      if (obj.hasOwnProperty(prop)) {
        str.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
      }
    return str.join('&');
  },
};
