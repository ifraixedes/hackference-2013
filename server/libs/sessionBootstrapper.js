'use strict';


/**
 * Dependencies
 */
var express = require('express');




/**
 * Initialisation function
 */
module.exports = function sessionBootstraper (expressApp) {
	if (expressApp === undefined) {
		throw new Error('The express application object reference is required');
	}

	// Avoid that initialize can be run again in a future event loop cycle meanwhile although this
	// method initialization is synchronous we execute in the beginning by convention
	delete exports.initialise;

	// Cookie parser middleware
	expressApp.use(express.cookieParser('hacking at hackference hackathon'));

	// Session
	expressApp.use(express.session({
		key: 'hackference.sess',
		store: express.session.memory,
		cookie: {
			path: '/',
			httpOnly: true,
			maxAge: null
		}
	}));
};






