// EXPORT ENDPOINTS ===========================================================
module.exports = function (API) {

	this.getAccountByKey = async (externalKey) => {
		
		try {

			return await API.get({
				uri: '/1.0/kb/accounts',
				params: { externalKey }
			});

		} catch (err) {

			if (err.code === 400) {
				throw new Error('An error occured: ' + JSON.stringify(err.data));
			}

			if (err.code === 404) {
				return null;
			}

			throw err;

		}
	
	}

	this.createAccount = async (newAccount, createdBy) => {
		await API.post({
			uri: '/1.0/kb/accounts',
			data: newAccount,
			headers: {
				'X-Killbill-CreatedBy': createdBy,
			}
		});
	}

	this.updateAccount = async (id, data, modifiedBy) => {
		const resp = await API.put({
			uri: `/1.0/kb/accounts/${id}`,
			data, headers: {
				'X-Killbill-CreatedBy': modifiedBy,
			}
		});
		return true;
	}

}