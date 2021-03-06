/**
 * @flow
 */

type Auth = {
  code: string,
  nip: string,
};

function encodeParams(obj: Object): string {
  const str = [];
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      str.push(`${encodeURIComponent(prop)}=${encodeURIComponent(obj[prop])}`);
    }
  }
  return str.join('&');
}

class ApiClient {

  auth: ?Auth = null;

  send(method: string, url: string, params: Object = {}): Promise {
    let body = null;
    /* eslint max-len: 0, quote-props:0 */
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
          requestURL = `${url}?${encodeParams(params)}`;
        }
        break;
      case 'POST':
        body = encodeParams(params);
        break;
      default:
        throw new Error(`Invalid method: ${method}`);
    }

    return fetch(requestURL, {
      method,
      headers,
      body,
    })
    .then((resp) => resp.text())
    .then((resp) => JSON.parse(resp.substring(9)));
  }

  setAuth(code: string, nip: string) {
    this.auth = {
      code,
      nip,
    };
  }
}

export default new ApiClient();
