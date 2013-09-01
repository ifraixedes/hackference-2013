'use strict';


var settings = require('../../../settings');

/**
 * Dependencies
 */
var createHash = require('crypto').createHash;
var mongoDbLogger = settings.appLoggers.getWinstonLogger('mongodb');
var helperActionsCtrls = require(settings.ctrlsPath + '/_helpers').actions;
var helperGlobalsCtrls = require(settings.ctrlsPath + '/_helpers').globals;
//Database (MongoDB)
var ObjectID = require('mongodb').ObjectID;
var mongoConnService = require(settings.servicesPath + '/mongoConns');

/**
 * Constants
 */
var LOG_PREFIX = 'Controller-> user | Pre-middlware-> registerNewUser: ';

/**
 *
 * @param req
 * @param res
 * @param next
 * @para post
 */
module.exports = function (req, res, next, post) {

	if (!mongoConnService.service) {
		helperGlobalsCtrls.addError(req, Error('Mongo DB service is not ready to use or has been stopped'),
			500);
		sendResponse(req, res, post);
		return;
	}

	var usersCol = mongoConnService.service.main.collection('users');
	var userRegObj = req.processed.userRegistration;
	var shasum = createHash('sha1');
	var userToRegister = {
		email: userRegObj.email
	};

	shasum.update(userRegObj.password);

	userToRegister.password = shasum.digest('base64');

	if (userRegObj.telephone) {
		userToRegister.telephone = userRegObj.telephone;
	}

	usersCol.insert(
		userToRegister,
		{
			safe: true
		},
		function (err, users) {

			if (err) {
				mongoDbLogger.error(LOG_PREFIX + ' Update error. Error details: ' + err.message);
				helperGlobalsCtrls.addError(req, Error('database error'), 500);
			}

			req.session.userLogIn(users[0], function (err) {
				if (err) {
					helperGlobalsCtrls.addError(req, Error('User session system fails. Error ' + err.message),
						500);
				}

				sendResponse(req, res, post);
			});
		}
	);
};


function sendResponse(req, res, post) {

	if (helperActionsCtrls.respAllIssues(req, res, post)) {
		return;
	}

	res.send(200);
	post(null, req, res);
}