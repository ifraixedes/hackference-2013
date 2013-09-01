'use strict';


var settings = require('../../../settings');

/**
 * Dependencies
 */
var mongoDbLogger = settings.appLoggers.getWinstonLogger('mongodb');
var helperGlobalsCtrls = require(settings.ctrlsPath + '/_helpers').globals;
var helperActionsCtrls = require(settings.ctrlsPath + '/_helpers').actions;
var preMiddlewareHelpers = require(settings.ctrlsPath + '/_helpers').middlewares.pre;
//Database (MongoDB)
var ObjectID = require('mongodb').ObjectID;
var mongoConnService = require(settings.servicesPath + '/mongoConns');

/**
 * Constants
 */
var LOG_PREFIX = 'Controller-> event | Pre-middlware-> parseEventAttendance: ';

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

	var usersCol = mongoConnService.service.main.collection('events');
	var eventAttendance = req.processed.eventAttendance;
	var user = req.session.getUser();
	var updateObj;


	if (eventAttendance.payedAmount) {
		updateObj = {
			$addToSet: {
				attendees: {_id: new ObjectID(user.id), amount: eventAttendance.payedAmount},
				$inc: {total_amount: eventAttendance.payedAmount}
			}
		};
	} else {
		updateObj = {
			$addToSet: {
				attendees: {_id: new ObjectID(user.id), amount: 0}
			}
		};
	}

	usersCol.update({
			url: eventAttendance.url
		},
		updateObj,
		{
			upsert: true
		},
		function (err) {

			if (err) {
				mongoDbLogger.error(LOG_PREFIX + ' Update error. Error details: ' + err.message);
				helperGlobalsCtrls.addError(req, Error('database error'), 500);
			}

			sendResponse(req, res, post);
			preMiddlewareHelpers.addProcessedData(req, 'event', {
				url:  eventAttendance.url
			}, true);
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