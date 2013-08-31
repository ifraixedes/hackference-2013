'use strict';


module.exports = {
	global: {
		addError: require('./addError')
	},
	actions: {
		respAllIssues: require('./actions/respAllIssues')
	},
	middlewares: {
		pre: {
			addProcessedData: require('./middlewares/pre/addProcessedData')
		}
	}
};

