'use strict';


module.exports = exports;

/**
 * Dependencies
 */
var async = require('async');

/**
 * globals
 */
var appServices;
var appServicesStop;

/**
 * Services' start.
 *
 * The module return all the application's services when they are ready to use, otherwise
 * bootstrap them to be them ready.
 *
 * NOTE: Each service is possible to be initialised individually, and get it when is ready
 * importing the module; this script is a helper to application to initialise all of them when in
 * the application's bootstrap stage
 *
 * @param {Function} callback
 */
function start(callback) {

	// The next dependencies are only required in the bootstrap stage, so they are into
	// the function rather than in the global scope of require loader to preserve memory
	var settings = require('../settings');
	var defLogger = settings.appLoggers.getWinstonLogger();
	var servicesToLoad = {};
	var service;


	// Delete the start function meanwhile the service is starting to avoid that it can be started
	// again
	delete exports.start;

	servicesToLoad.mongoConns = function (callback) {
		(require('./mongoConns')).start(callback);
	};

	async.parallel(servicesToLoad, function (err, loadedServices) {

		if (err) {
			// Restore the start function, because an error happened
			exports.start = start;

			// Restore the initialise function, because an error happened
			defLogger.error('App-services-bootstrap: Some of the application services bootstrap ' +
				'process falied. Error details: ' + err.message);

			callback(err);
			return;
		}

		appServices = {};
		appServicesStop = [];


		for (service in loadedServices) {
			// Make public the several db connections as object's properties of the module
			appServices[service] = loadedServices[service];
			appServicesStop.push(loadedServices[service].stop);
		}

		// Enable the stop function
		exports.stop = stop;
		callback(null, exports);

	});

};


/**
 *  Services' stop
 *
 * This function is a wrapper, which stops the several services that the application use; it is
 * useful when the application's server stop so all services should be properly stopped.
 *
 * @param {Function} callback
 */
function stop(callback) {

	// Delete the stop function meanwhile the service is stopping to avoid that it can be stopped
	// again
	delete exports.stop;

	async.parallel(appServicesStop, function (err) {
		if (err) {
			// Restore the stop function, because an error happened
			exports.stop = stop;
			callback(err);
			return;
		}

		appServices = null;
		appServicesStop = null;

		// Enable the start function
		exports.start = start;
		callback();

	});

}


Object.defineProperty(exports, 'services', {
	enumerable: false,
	configurable: false,
	get: function () {
		return appServices;
	}
});

exports.start = start;
