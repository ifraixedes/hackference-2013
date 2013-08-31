'use strict';


var settings = require('../settings');
var genericCtrl = require(settings.ctrlsPath + '/_generic');
var eventCtrl = require(settings.ctrlsPath + '/event');


module.exports = [
	{
		// We may use regular expressions (/\/messages\/([\d]*)/) but, express process the request
		// although the 'id' is not a number, assigning to req.params[0] an empty string, so better use
		// a middleware to parse it and it is not number response with error
		path: '/event/attend',
		method: 'post',
		action: eventCtrl.actions.register,
		pre: eventCtrl.middlewares.pre.parseEventData,
		post: [
			genericCtrl.middlewares.post.errorTracker,
			genericCtrl.middlewares.post.twilioNotifier
		]
	}
];
