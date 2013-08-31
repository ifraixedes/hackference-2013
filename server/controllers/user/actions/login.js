'use strict';


var settings = require('../../../settings');

/**
 * Dependencies
 */
var passport = require('passport');

/**
 * Globals
 */
var helperGlobalsCtrls = require(settings.ctrlsPath + '_helpers').globals;
var helperActionsCtrls = require(settings.ctrlsPath + '_helpers').actions;
var secIssuesLogger = settings.appLoggers('securityIssues');

/**
 * Constants
 */
var LOG_PREFIX = 'Controller-> user | Action-> login: ';


/**
 *
 * @param req
 * @param res
 * @param next
 * @para post
 */
module.exports = function (req, res, next, post) {

	passport.authenticate('local', function (err, user) {

		if (err) {
			secIssuesLogger.logger(LOG_PREFIX + 'Bad authenticaiton. Details: ' + err.message);
			helperGlobalsCtrls.addError(err.message, 401);

		} else {
			req.session.userLogIn(user);
		}

		sendResponse(req, res, post);
	});

};

function sendResponse(req, res, post) {

	if (helperActionsCtrls.respAllIssues(req, res, post)) {
		return;
	}

	res.send(200);
	post(null, req, res);
}