'use strict';


var settings = require('../../../../settings');

/**
 * Dependencies
 */
var checker = require('validator').check;
var defLogger = settings.appLoggers.getWinstonLogger();

/**
 * Constants
 */
var LOG_PREFIX = 'Controller-> app | Pre-middlware-> parseSpeakerQuery: ';

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = function parseSpeakerQuery(req, res, next) {

	try {
//		checker(req.params.id).isNumeric();
//		req.processed = req.params.id;
		next();

	} catch (e) {

		defLogger.warn(LOG_PREFIX + '<<<write the message>>');
		res.send(400, 'Invalid format key');
	}
};

