var winston = require('winston');
var settings = require('../../settings.js');

/**
 * The path to the flat files is absolute and it will be prepended to the
 * winston filename option parameter of the File transport type
 */

module.exports = {
	app: {
		winstons: {
			_default: {
				global: {
					flatFiles: {
						rootPath: settings.rootPath
							+ '/tmp/logs'
					}
				},
				transports: [
					{
						transport: winston.transports.Console,
						options: {
							json: true,
							colorize: true
						}
					},
					{
						transport: winston.transports.File,
						options: {
							filename: 'winston_dev.log'
						}
					}
				]
			},
			securityIssues: {
				global: {
					flatFiles: {
						rootPath: settings.rootPath
							+ '/tmp/logs'
					}
				},
				transports: [
					{
						transport: winston.transports.Console,
						options: {
							json: true,
							colorize: true
						}
					},
					{
						transport: winston.transports.File,
						options: {
							filename: 'security_issues_dev.log'
						}
					}
				]
			},
			systemActivityInfo: {
				global: {
				},
				transports: [
					{
						transport: winston.transports.Console,
						options: {
							json: true,
							colorize: true
						}
					}
				]
			},
		},
		expressWinston: {
			errorLogger: {
				global: {
					flatFiles: {
						rootPath: settings.rootPath
							+ '/tmp/logs'
					}
				},
				transports: [
					{
						transport: winston.transports.File,
						options: {
							filename: 'expressWinston_error_dev.log'
						}
					}
				]
			},
			logger: {
				global: {
					flatFiles: {
						rootPath: settings.rootPath
							+ '/tmp/logs'
					}
				},
				transports: [
					{
						transport: winston.transports.File,
						options: {
							filename: 'expressWinston_logger_dev.log'
						}
					}
				]
			}
		}
	}
};