'use strict';


var settings = require('../settings');
var userCtrl = require(settings.ctrlsPath + '/user');


module.exports = [
	{
		path: '/user/login',
		method: 'post',
		action: userCtrl.actions.login
	},
	{
		path: '/user/registration',
		method: 'post',
		action: userCtrl.actions.registerNewUser,
		pre: userCtrl.middlewares.pre.registrationDataChecker
	}
];
