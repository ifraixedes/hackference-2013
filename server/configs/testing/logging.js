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
						transport: winston.transports.File,
						options: {
							filename: 'winston_test.log'
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
						transport: winston.transports.File,
						options: {
							filename: 'security_issues_test.log'
						}
					}
				]
			},
			systemActivityInfo: {
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
							filename: 'system_activity_test.log'
						}
					}
				]
			}
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
							filename: 'expressWinston_error_test.log'
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
							filename: 'expressWinston_logger_test.log'
						}
					}
				]
			}
		}
	}
};