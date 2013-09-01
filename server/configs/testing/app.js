'use strict';

var settings = require('../../settings.js');
var connect = require('connect');
var express = require('express');
var sessManagerMiddleware = require(settings.libsPath + '/ifc/connect/sessionManager');


module.exports = {
	http: {
		// Value comes from the user settings or package.json if the user hasn't customised it and
		// he called the application using npm start, otherwise the value is picked from package.json
		// straight away
		port: (process.env.npm_package_config_testing_http_port) ?
			process.env.npm_package_config_testing_http_port :
			settings.package.config.testing.http.port

	},
	express: { // This object define the express settings to use
		// Empty, so default settings will be used
	},
	express_middlewares: [
		express.static(settings.publicPath),
		connect.middleware.json(), // Get json body from application/json headers but it doesn't parse it
		settings.libsPath + '/sessionBootstrapper',
		sessManagerMiddleware(require(settings.libsPath + '/sessionManager')),
		settings.appLoggers.getExpressWinston('logger'), // Request logger
		settings.routesPath, // Routes
		settings.appLoggers.getExpressWinston('errorLogger') // Error logger
	]
};
