'use strict';


var settings = require('../../../../settings');

/**
 *
 * @param err
 * @param req
 * @param res
 * @param post
 */
module.exports = function errorTracker(err, req, res, post) {


	// Execute next post-middleware
	post(err, req, res);
};

