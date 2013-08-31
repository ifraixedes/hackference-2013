'use strict';


module.exports = {
	middlewares: {
		post: {
			twilioNotifier: require('./../_generic/middlewares/post/twilioNotifier'),
			errorTracker: require('./../_generic/middlewares/post/errorTracker')
		}
	}
};

