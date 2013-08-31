'use strict';

var settings = require('../../../../settings');

/**
 * Globals
 */
var secIssuesLogger = settings.appLoggers('securityIssues');

/**
 * Constants
 */
var LOG_PREFIX = 'Controller-> user | Pre-middlware-> authUserChecker: ';

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = function authUserChecker(req, res, next) {

	if ((!req.session) || (!res.session.isUserAuthenticated())) {
		res.send(401, 'User is authenticated');
		secIssuesLogger(LOG_PREFIX + 'Unauthorised user trying to reach ' + req.route.url);
		return;
	}

	next();
};