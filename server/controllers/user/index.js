'use strict';


module.exports = {
	actions: {
		login: require('./actions/login'),
		registerNewUser: require('./actions/registerNewUser')
	},
	middlewares: {
		pre: {
			registrationDataChecker: require('./middlewares/pre/registrationDataChecker'),
			authUserChecker: require('./middlewares/pre/authUserChecker')
		}
	}
};

