'use strict';


var settings = require('../../../../settings');

/**
 *
 * @param err
 * @param req
 * @param res
 * @param post
 */
module.exports = function twilioNotifier(err, req, res, post) {

	// Call next post middleware
	post(err, req, res);

};
