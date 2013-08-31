var http = require('http');
var should = require('should');

process.env.npm_package_config_env = 'testing';

describe('when server is up, ', function () {

	var app = require('../server/app');
	var httpServer;
	var newMsgId;

	before(function (done) {
		app(function (err, server) {
			if (err) {
				done(err);
			} else {
				httpServer = server;
				done();
			}
		});
	});

	after(function (done) {
		httpServer.close(function () {
			done();
		});
	});

	describe('requesting', function () {

		it('show speaker return an empty object', function (done) {
			var req = http.request({
				host: '127.0.0.1',
				port: '8010',
				path: '/show/speaker',
				method: 'get',
				headers: {
					'Content-Type': 'application/json'
				}
			}, function (res) {
				try {
					res.should.have.status(200);
					res.setEncoding('utf8');

					res.on('data', function (chunk) {
						try {
							var emptyObject = JSON.parse(chunk);
							emptyObject.should.a('object');

							done();
						} catch (e) {
							done(e);
						}
					});
				} catch (e) {
					done(e);
				}
			});

			req.on('error', function (err) {
				done(err);
			});

			//req.write(JSON.stringify({message: 'test'}));
			req.end();
		});
	});

});
