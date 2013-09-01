'use strict';

//var settings = require('../settings.js');
//var expApp = settings.expressApp;


module.exports = function (expressApp) {

	var settings = require('../settings');
	var Wirexroutes = require('wirexroutes');
	var routes = require('./user');

	routes.push.apply(routes, require('./event'));

	new Wirexroutes(expressApp, routes);

};