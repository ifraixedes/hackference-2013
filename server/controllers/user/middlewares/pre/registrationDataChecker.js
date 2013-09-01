'use strict';


var settings = require('../../../../settings');

/**
 * Dependencies
 */
var checker = require('validator').check;
var defLogger = settings.appLoggers.getWinstonLogger();
var preMiddlewareHelpers = require(settings.ctrlsPath + '/_helpers').middlewares.pre;

/**
 * Constants
 */
var LOG_PREFIX = 'Controller-> user | Pre-middlware-> registrationDataChecker: ';

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = function registrationDataChecker(req, res, next) {

	try {
		var userRegObj = req.body;

		checker(userRegObj.email).isEmail();
		checker(userRegObj.password).len(8);

		preMiddlewareHelpers.addProcessedData(req, 'userRegistration', userRegObj, false, next);

	} catch (e) {

		defLogger.warn(LOG_PREFIX + e.message);
		res.send(400, 'Invalid user registration fields: ' + e.message);
	}
};

