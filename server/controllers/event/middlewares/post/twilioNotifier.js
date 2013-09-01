'use strict';


var settings = require('../../../../settings');

/**
 * Dependencies
 */
var twilio = require('twilio')('api key', 'token');
var mongoDbLogger = settings.appLoggers.getWinstonLogger('mongodb');
//Database (MongoDB)
var ObjectID = require('mongodb').ObjectID;
var mongoConnService = require(settings.servicesPath + '/mongoConns');

/**
 * Constants
 */
var LOG_PREFIX = 'Controller-> event | Post-middlware-> twilioNotifier: ';

/**
 *
 * @param req
 * @param res
 * @para post
 */
module.exports = function (err, req, res, post) {

	if (!mongoConnService.service) {
		post(Error('Mongo DB service is not ready to use or has been stopped'), req, res);
		return;
	}


	var eventCol = mongoConnService.service.main.collection('events');
	var userCol = mongoConnService.service.main.collection('users');
	var event;

	if ((!req.processed) || (!req.processed.event)) {
		post(null, req, res);
		return;
	} else {
		event = req.processed.event;
	}


	eventCol.findOne({
			url: event.url
		},
		{
			url: true,
			'attendees._id': true
		},
		function (err, event) {

			if (err) {
				mongoDbLogger.error(LOG_PREFIX + ' Error when getting the even\'s attendess. Error ' +
					'details: ' + err.message);
				post(Error('database error'), req, res);
				return;
			}


			if (event) {

				var nAtt = event.attendees.length;
				var textSms = 'The event: ' + event.url + ' have ' + nAtt + ' attendees';;


				event.attendees.forEach(function (attendee) {

					userCol.findOne({
							_id: attendee._id
						}, {
							telephone: true
						},
						function (err, user) {
							nAtt--;

							if (err) {
								mongoDbLogger.error(LOG_PREFIX +
									' Error when getting an user\'s telephone. Error ' +
									'details: ' + err.message);

								if (nAtt === 0) {
									post(null, req, res);
								} else {
									return;
								}
							}

							if (user.telephone) {

								twilio.sendSms({
									to: user.telephone,
									from: '+441202835340',
									body: textSms
								}, function (err, responseData) {
									if (err) { // "err" is an error received during the request, if any

										console.error(err);
										post(err, req, res);

									} else {
										// "responseData" is a JavaScript object containing data received from Twilio.
										// A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
										// http://www.twilio.com/docs/api/rest/sending-sms#example-1
										console.log(responseData.from); // outputs "+14506667788"
										console.log(responseData.body); // outputs "word to your mother."
										post(null, req, res);
									}

								})

							} else {
								if (nAtt === 0) {
									post(null, req, res);
								}
							}

						});
				});

			} else {
				post(null, req, res);
			}

		});
};