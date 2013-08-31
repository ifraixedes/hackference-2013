'use strict';


var settings = require('../../../settings');

/**
 * Dependencies
 */
var createHash = require('crypto').createHash;
var mongoDbLogger = settings.appLoggers('mongodb');
var helperCtrls = require(settings.ctrlsPath + '_helpers');
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
		helperCtrls.addError(req, Error('Mongo DB service is not ready to use or has been stopped'),
			500);
		sendResponse(req, res, post);
		return;
	}

	var usersCol = mongoConnService.service.main.collection('users');
	var userRegObj = req.processed.userRegistration;


	usersCol.insert({
			email: userRegObj.email,
			password:  createHash(userRegObj.password)
		},
		function (err) {

			if (err) {
				mongoDbLogger.error(LOG_PREFIX + ' Update error. Error details: ' + err.message);
				helperCtrls.addError(req, Error('database error'), 500);
			}

			sendResponse(req, res, post);
		}
	);


};


function sendResponse(req, res, post) {

	if (helperCtrls.respAllIssues(req, res, post)) {
		return;
	}

	res.send(200);
	post(null, req, res);
}