'use strict';


var settings = require('../../../../settings');

/**
 * Dependencies
 */
var defLogger = settings.appLoggers.getWinstonLogger();
var checker = require('validator').check;
var preMiddlewareHelpers = require(settings.ctrlsPath + '/_helpers').middlewares.pre;


/**
 * Constants
 */
var LOG_PREFIX = 'Controller-> event | Pre-middlware-> parseEventAttendance: ';

/**
 * Expected object under req.body: {
 *  url: Event url,
 *  transaction_id:
 * }
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = function parseEventAttendance(req, res, next) {

	try {

		var eventAttObj = req.body;

		checker(eventAttObj.url).isUrl();

//		if (eventAttObj.tracks) {
//				if (eventAttObj.tracks instanceof Array) {
//
//					// TODO check if all the elements are numbers
//
//
//				} else {
//					throw new Error('tracks must be an array');
//				}
//		} else {
//			eventAttObj.tracks = [];
//		}

		preMiddlewareHelpers.addProcessedData(req, 'eventAttendance', eventAttObj, false, next);
	} catch (e) {

		defLogger.warn(LOG_PREFIX + 'Invalid event attendance object. Error details: ' + e.message);
		res.send(400, 'Invalid event attendance object');
	}
};
