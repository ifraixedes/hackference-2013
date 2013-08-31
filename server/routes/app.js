'use strict';


var settings = require('../settings');
var genericCtrl = require(settings.ctrlsPath + '/_generic');
var appCtrl = require(settings.ctrlsPath + '/app');


module.exports = [
//	{
//		// We may use regular expressions (/\/messages\/([\d]*)/) but, express process the request
//		// although the 'id' is not a number, assigning to req.params[0] an empty string, so better use
//		// a middleware to parse it and it is not number response with error
//		path: '/messages/:id',
//		method: 'get',
//		action: appCtrl.actions.getMessage,
//		pre: appCtrl.middlewares.pre.checkMsgId,
//		post: [
//			genericCtrl.middlewares.post.errorTracker,
//			genericCtrl.middlewares.post.ipTracker
//		]
//	},
//	{
//		path: '/messages',
//		method: 'post',
//		action: appCtrl.actions.storeMessage,
//		pre: appCtrl.middlewares.pre.sanitiseMsgBody,
//		post: [
//			genericCtrl.middlewares.post.errorTracker,
//			genericCtrl.middlewares.post.ipTracker
//		]
//	}
];
