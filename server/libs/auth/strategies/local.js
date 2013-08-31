

(function initialize() {
	'use strict';

	/** Dependencies **/
	var settings = require('../../../settings.js');
	var createHash = require('crypto').createHash;

// Passport
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;

//Database (MongoDB)
	var mongoConnService = require(settings.servicesPath + '/mongoConns');


	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function (emailAddr, password, done) {

		var usersCol;

		if (!mongoConnService.service) {
			done(new Error('Mongo DB service is not ready to use or has been stopped'));
			return;
		}

		usersCol = mongoConnService.service.main.collection('users');

		usersCol.findOne({
				email: emailAddr
			}, {
				_id: true
			},
			function (err, user) {


				if (err) {
					return done(err);
				}

				// Check if there is an user registered, otherwise a new user is requesting create a new account
				// this function doesn't save the new user into the the DDBB, it is delegated to other
				if (!user) {
					done(null, false, {
						message: 'No registered user with the email address: ' + emailAddr
					});

					return;
				}


				var passwordHash = createHash(password);

				if (passwordHash === user.password) {
					delete user.password;

					done(null, user);

				} else {
					done(null, false, {
						message: 'Invalid password'
					});
				}

			}); // End the search of the user in the database
	})); // End Passport local authentication

	// This file it is only called one time, to load the login strategy, so we remove the empty
	// object from require's cache to consume less memory
	delete require.cache[__filename];

}()); // End module initialization
