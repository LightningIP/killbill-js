//const js2xml = require("js2xmlparser");
//const xml2js = require('xml2js');
const axios = require('axios');

// EXPORT ENDPOINTS ===========================================================
module.exports = function({baseUrl, apiKey, apiSecret, username, password}) {

	// XML API Request
	this.get = async ({ uri, params, headers }) => {

		headers = Object.assign({
			"X-Killbill-ApiKey": apiKey,
			"X-Killbill-ApiSecret": apiSecret
		});

		const auth = { username, password };

		try {

			const resp = await axios.get(
				baseUrl + uri,
				{ headers, params, auth },
			);
			return resp.data;

		} catch (httpErr) {

			if (httpErr.code === 'ETIMEDOUT') {
				throw new Error('[Error] Connection timed out when connecting to KillBill');
			}

			// Collect error data
			const code=  httpErr.response.status;
			const data = httpErr.response.data;

			// Build error
			const error = new Error()
			error.code = code;
			error.data = data;

			// throw error
			throw error;

		}

	};


	// Add modules
	this.bundles = new(require('./modules/bundles'))(this);

}