'use strict';

//var settings = require('../settings.js');
//var expApp = settings.expressApp;


module.exports = function (expressApp) {

	var settings = require('../settings');
	var Wirexroutes = require('wirexroutes');
	var routes = require('./app');

	new Wirexroutes(expressApp, routes);

};