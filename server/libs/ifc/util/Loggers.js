'use strict';
/**
 *
 */

module.exports = exports;

/**
 * Dependencies
 */
var winston = require('winston');
var expressWinston = require('express-winston');

/**
 * Constructor
 *
 * @param {Object} configuration object
 */
function Loggers(configObj) {

	this.winstonsLoggers = {};
	this.expressWinston = {};
	this.loadLoggers(configObj || {});
}

/**
 * TODO document
 *
 * @api public
 */
Loggers.prototype.loadLoggers = function loadLoggers(winstonCnfg) {
	var itT;
	var winstonId;
	var transports;
	var rmDefWinstonConsole = true;
	var defWinston = true;

	// Load Winston
	for (winstonId in winstonCnfg.winstons) {

		if (winstonId === '_default') {

			this.winstonsLoggers[winstonId] = winston;
			defWinston = true;

		} else {

			defWinston = false;

			if (winstonCnfg.winstons[winstonId].options) {
				this.winstonsLoggers[winstonId] =
					new winston.Logger(winstonCnfg.winstons[winstonId].options);
			} else {
				this.winstonsLoggers[winstonId] = new winston.Logger();
			}
		}

		// Transports to add to this logger
		transports = winstonCnfg.winstons[winstonId].transports;
		for (itT = 0; itT < transports.length; itT++) {

			if (transports[itT].transport == undefined) {
				throw new Error('A winston definition require the transport '
					+ 'parameter to provide to winston add method');
			}
			if (defWinston && (transports[itT].transport === winston.transports.Console)) {
				// Console transport is also added to Winston default, so it cannot be added
				rmDefWinstonConsole = false;
				continue;
			}

			this.winstonsLoggers[winstonId].add(transports[itT].transport, this
				.applyGlobalToTransportOptions(winstonCnfg.winstons[winstonId].global,
					transports[itT].transport, transports[itT].options));
		}// End loop of transports to add
	}// End loop of loggers to load

	if (rmDefWinstonConsole) {
		// If the configuration file doesn't specify the console Transport in _default, then we remove
		// it from the default winston instance
		winston.remove(winston.transports.Console);
	}

	// No winstons defined, then the winston is registered by default
	if (this.winstonsLoggers._default === undefined) {
		this.winstonsLoggers._default = winston;
	}

	// Load express-winston
	if (winstonCnfg.expressWinston !== undefined) {
		var transportsInst = [];

		// Instance the transports for express-winston error handler
		if (winstonCnfg.expressWinston.errorLogger !== undefined) {

			transportsInst = [];
			transports = winstonCnfg.expressWinston.errorLogger.transports;

			for (itT = 0; itT < transports.length; itT++) {

				if (transports[itT].transport == undefined) {
					throw new Error('A express-winston definition require the winston transport to ' +
						'instantiate');
				}

				transportsInst.push(new transports[itT].transport(this.applyGlobalToTransportOptions(
					winstonCnfg.expressWinston.errorLogger.global, transports[itT].transport,
					transports[itT].options)));
			}// End loop of transports for express-winston error handler

			if (transportsInst.length > 0) {
				this.expressWinston.errorLogger = expressWinston.errorLogger({
					transports: transportsInst
				});
			}
		}// End express-winston error handler

		// Instance the transports for express-winston logger
		if (winstonCnfg.expressWinston.logger !== undefined) {

			transportsInst = [];
			transports = winstonCnfg.expressWinston.logger.transports;

			for (itT = 0; itT < transports.length; itT++) {

				if (transports[itT].transport == undefined) {
					throw new Error('A express-winston definition require the winston '
						+ 'transport to instantiate');
				}

				transportsInst.push(new transports[itT].transport(this.applyGlobalToTransportOptions(
					winstonCnfg.expressWinston.logger.global, transports[itT].transport,
					transports[itT].options)));
			}// End loop of transports for express-winston logger

			if (transportsInst.length > 0) {
				this.expressWinston.logger = expressWinston.logger({
					transports: transportsInst
				});
			}
		}
	}// End load express-winstons
};

/**
 * TODO document
 *
 * @param globalCnfg
 * @param transport
 * @param options
 * @returns {Object}
 * @api private
 */
Loggers.prototype.applyGlobalToTransportOptions = function (globalCnfg, transport, options) {

	var filePath;

	if (transport === winston.transports.File) {
		try {
			filePath = globalCnfg.flatFiles.rootPath + '/';
		} catch (e) {
			throw new ('The global.flatFiles.rootPath parameters is required if there is one winston ' +
				'File transport to setup');
		}

		if (options === undefined) {
			options = {
				filename: filePath + process.env.NODE_ENV + '.log'
			};
		} else {
			options.filename = filePath + options.filename;
		}

	}

	return options;
};

/**
 * TODO document
 *
 * @param [winstonId]
 * @returns {Object}
 * @api public
 */
Loggers.prototype.getWinstonLogger = function getWinstonLogger(winstonId) {
	var id = (winstonId === undefined) ? '_default' : winstonId;

	if (this.winstonsLoggers[id] === undefined) {
		throw new Error('There is not any winston logger registered with the id ' + id);
	}

	return this.winstonsLoggers[id];
};

/**
 * TODO document
 *
 * @param {String} type express-winston type; supported errorLogger and logger
 * @returns {Object}
 * @api public
 */
Loggers.prototype.getExpressWinston = function getExpressWinston(type) {

	if (type === undefined) throw new Error('The express-winston type parameter is required');

	if (this.expressWinston[type] === undefined) {
		throw new Error('The express-winston type ' + type + ' has not set');
	}

	return this.expressWinston[type];
};


/**
 * The Loggers instances.
 *
 * @type {Object}
 */
module.exports = Loggers;