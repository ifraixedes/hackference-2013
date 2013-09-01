'use strict';


module.exports = {
	globals: {
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

