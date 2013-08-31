'use strict';


var settings = require('../../../settings');
var defLogger = settings.appLoggers.getWinstonLogger();


/**
 *
 * @param req
 * @param res
 * @param next
 * @para post
 */
module.exports = function showSpeaker(req, res, next, post) {

	// No speakers at the moment
	res.json(200, {});
	post(null, req, res);

};