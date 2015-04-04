/**
 * @flow
 */
'use strict';

var URL_BASE = 'https://mobile.uqam.ca/portail_etudiant';

var URL_LOGIN = URL_BASE + '/proxy_dossier_etud.php';
var URL_GRADES = URL_BASE + '';

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
						reject(resp.err);
					} else {
						var user = {
							firstName: resp.socio.prenom,
							lastName: resp.socio.nom,
							code: code,
						};
						client.auth = {
							code: code,
							nip: nip,
						}
						resolve(user);
					}
				}).done();
		});
	},

	getGrades(session) {
		return new Promise((resolve, reject) => {

		});
	}
};

var client = {
	auth: null,

	send(method, url, params) {
		params = params || {};
		var body = null;
		var headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Origin': 'https://mobile.uqam.ca',
			'Referer': 'https://mobile.uqam.ca/portail_etudiant/',
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.36 Safari/537.36',
		}
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
			break;
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
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	    }
	  return str.join("&");
	},
};


