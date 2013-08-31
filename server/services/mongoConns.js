'use strict';

module.exports = exports;

/**
 * Interface:
 *
 * {Function} start
 * {Function} stop
 * {Object} service Mongodb connection pools available (Each one offers a connection pool to
 *  one server's database) as specified in mongodb configuration file (configs/<<env>>/mongodb
 */


/**
 * Global
 */
var mongoDbConns = null;

/**
 *
 * @param callback
 */
function start (callback) {

	// The next dependencies are only required in the initialisation stage, so they are into
	// the function rather than in the global scope of require loader to preserve memory
	var settings = require('../settings');
	var MongoClient = require('mongodb').MongoClient;
	var async = require('async');
	var appMLogger = settings.appLoggers.getWinstonLogger('mongodb');

	var mongoConfig = settings.configLoader('mongodb');
	var connConfig;
	var dbConns = {};

	// Delete the start function meanwhile the service is starting to avoid that it can be started
	// again
	delete exports.start;

	for (connConfig in mongoConfig) {
		dbConns[connConfig] = function (callback) {
			MongoClient.connect(mongoConfig[connConfig].url, mongoConfig[connConfig].options, callback);
		};
	}

	async.parallel(dbConns, function (err, dbs) {

		if (err) {
			// Restore the start function, because an error happened
			exports.start = start;
			appMLogger.error('Service-mongoConns: MongoDB connection error into the service ' +
				'initialisation. Error details: ' + err.message);

			callback(err);
			return;
		}

		var db;
		mongoDbConns = {};


		for (db in dbs) {
			// Make public the several db connections as object's properties of the module
			mongoDbConns[db] = dbs[db];
		}

		// Enable service's stop
		exports.stop = stop;
		callback(null, exports);

	});
}

function stop (callback) {

	var dbConn;

	// Delete the stop function meanwhile the service is stopping to avoid that it can be stopped
	// again
	delete exports.stop;

	for (dbConn in mongoDbConns) {
		mongoDbConns[dbConn].close();
	}

	mongoDbConns = null;
	//
	exports.start = start;

	callback();
}



Object.defineProperty(exports, 'service', {
	enumerable: false,
	configurable: false,
	get: function () {
		return mongoDbConns;
	}
});

// start/stop are only available when the the operations can be performed, so if none exist then
// the server is on starting/stopping stage
exports.start = start;