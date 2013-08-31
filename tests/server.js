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

	after(function () {
		httpServer.close();
	});

	describe('sending', function () {

		it('a new message the server should respond with new message id', function (done) {
			var req = http.request({
				host: '127.0.0.1',
				port: '8010',
				path: '/show/speaker',
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				}
			}, function (res) {
				try {
					res.should.have.status(200);
					res.setEncoding('utf8');

					res.on('data', function (chunk) {
						try {
							var objId = JSON.parse(chunk);
							objId.id.should.a('number');

							newMsgId = objId.id;

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

			req.write(JSON.stringify({message: 'test'}));
			req.end();
		});

		it('a new message with a possilbe XSS should return 400 code and "fuck off"', function (done) {
			var req = http.request({
				host: '127.0.0.1',
				port: '8010',
				path: '/messages',
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				}
			}, function (res) {
				try {
					res.should.have.status(400);
					res.setEncoding('utf8');

					res.on('data', function (chunk) {
						try {
							chunk.should.equal('fuck off');
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

			req.write(JSON.stringify({message: '<script>alert()</script>'}));
			req.end();

		});
	});

	describe('getting', function () {

		it('a existing message the server should respond with it', function (done) {
			var req = http.request({
				host: '127.0.0.1',
				port: '8010',
				path: '/messages/' + newMsgId,
				method: 'get'
			}, function (res) {
				try {
					res.should.have.status(200);
					res.setEncoding('utf8');

					res.on('data', function (chunk) {
						try {
							var objId = JSON.parse(chunk);
							objId.should.eql({message: 'test'});
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

			req.end();
		});

		it('a request with a nonexistent id the server should response a message', function (done) {
			var req = http.request({
				host: '127.0.0.1',
				port: '8010',
				path: '/messages/9999',
				method: 'get'
			}, function (res) {
				try {
					res.should.have.status(200);
					res.setEncoding('utf8');

					res.on('data', function (chunk) {
						try {
							chunk.should.equal('No message with the specified key');
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

			req.end();
		});

		it('a request with a mal formatted id the server should response 400 status code with a ' +
			'"Invalid format key" message',
			function (done) {
				var req = http.request({
					host: '127.0.0.1',
					port: '8010',
					path: '/messages/badKey',
					method: 'get'
				}, function (res) {
					try {
						res.should.have.status(400);
						res.setEncoding('utf8');

						res.on('data', function (chunk) {
							try {
								chunk.should.equal('Invalid format key');
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

				req.end();
			});
	});

});
