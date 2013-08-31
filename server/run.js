'use strict';

function shutdownServerFn(httpServer) {

	return function () {
		httpServer.close();
		process.exit(0);
	};
};


require('./app')(function (err, httpServer) {
	if (err) {
		console.error('Application bootstrap crashed. Error details: ' + err.message);
		return;
	}

	process.on('SIGINT', shutdownServerFn(httpServer));
	process.on('SIGTERM', shutdownServerFn(httpServer));

	console.info('Server listening');
});


