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
 *  [payment_token]: The payment token got from paymill
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
		preMiddlewareHelpers.addProcessedData(req, 'eventAttendance', eventAttObj, false);

		if (eventAttObj.payment_token) {
			preMiddlewareHelpers.addProcessedData(req, 'paymentToken', eventAttObj.payment_token, false);
		}

		next();

	} catch (e) {

		defLogger.warn(LOG_PREFIX + 'Invalid event attendance object. Error details: ' + e.message);
		res.send(400, 'Invalid event attendance object');
	}
};
