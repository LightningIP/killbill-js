// EXPORT ENDPOINTS ===========================================================
module.exports = function (API) {

	this.getBundleByKey = async (externalKey) => {
		
		try {
			const bundles = await API.get({
				uri: '/1.0/kb/bundles',
				params: { externalKey }
			})

			if(bundles.length) {
				return bundles.shift();
			}

			throw Object.assign(new Error('Bundle not found'));

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

}