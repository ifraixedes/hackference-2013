'use strict';



module.exports = function SessionManager(sessManager) {


	return function (req, res, next) {

		if (req.session) {
			sessManager(req.session);
			next();
		} else {
			next();
		}

	}

};
