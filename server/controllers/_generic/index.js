'use strict';


module.exports = {
	middlewares: {
		post: {
			errorTracker: require('./../_generic/middlewares/post/errorTracker')
		}
	}
};

