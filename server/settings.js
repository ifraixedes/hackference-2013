'use strict';


module.exports = exports;

/**
 * Dependencies
 */
var path = require('path');
var rootPath = __dirname;

exports.package = require('../package.json');


exports.env = (process.env.npm_package_config_env) ?
	process.env.npm_package_config_env : exports.package.config.env;


exports.rootPath = rootPath;
exports.routesPath = path.join(rootPath, 'routes');
exports.ctrlsPath = path.join(rootPath, 'controllers');
exports.servicesPath = path.join(rootPath, 'services');
exports.configsPath = path.join(rootPath, 'configs/' + exports.env + '/');
exports.libsPath = path.join(rootPath, 'libs');
exports.sysPath = path.join(rootPath, 'sys');
exports.tempPath = path.join(rootPath, 'tmp');
//exports.srvTestsPath = path.join(rootPath, 'tests');

// Application configuration files loader function
var configLoader = exports.configLoader = function (configFile) {
	return require(exports.configsPath + configFile);
};


var Loggers = require(exports.libsPath + '/ifc/util/Loggers');
// Export the app loggers to use across the application
exports.appLoggers = new Loggers(configLoader('logging')['app']);


/*
 * Objects instances and variables to share in the application; this values
 * should be populated by the application if they are required; they put here to
 * know which are used by this application.
 */

// Express App instance
exports.expressApp = null;

