module.exports = function (callback) {
	'use strict';


// Module dependencies
// Settings is the first script to load the application, because it acts as a global object
// which holds global settings, objects and function used across whole application
	var settings = require('./settings.js');

	var http = require('http');
	var express = require('express');
	var expressBootstrapper = require(settings.libsPath + '/ifc/util/expressBootstrapper');
	var expressApp = settings.expressApp = express();
	var httpServer = http.createServer(expressApp);

// Configuration variables
	var appCnf = settings.configLoader('app');


	if (!callback) {
		callback = function (err) {

			if (err) {
				console.error(err);
				process.exit(1);
			}

			console.info('Server listening on port ' + appCnf.http.port);
		}
	}

// Set the express configuration parameters and express middlewares specified in the app
// configuration file
	if ((appCnf.express) && (appCnf.express_middlewares)) {
		expressBootstrapper(expressApp, appCnf.express, appCnf.express_middlewares);
	} else {
		if (appCnf.express) {
			expressBootstrapper(expressApp, appCnf.express);
		} else if (appCnf.express_middlewares) {
			expressBootstrapper(expressApp, appCnf.express_middlewares);
		}
	}


	/***** HTTP Server start *****/
	httpServer.listen(appCnf.http.port);
	callback(null, httpServer);
};


