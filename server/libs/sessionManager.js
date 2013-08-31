'use strict';


module.exports = function sessionManager(sess) {


	/* Session manager methods */

	/**
	 * Create the session for the provided user.
	 * In the present time the session only store an strigify version of user._id, so user object must
	 * contains the _id attribute.
	 *
	 * @param sess
	 * @param user
	 * @param callback
	 */
	sess.userLogIn = function userLogIn(user, callback) {

		if (user._id) {
			callback(new Error('User\'s _id attribute is required'));
			return;
		}

		// Regenerate the session to avoid Session Fixations attack
		// (http://en.wikipedia.org/wiki/Session_fixation)
		sess.regenerate(function (err) {

			if (err) {
				callback(err);
				return;
			}

			// Update our session reference to the new one which has been generated
			sess = sess.req.session;
			sess.user = {
				id: user._id.toString()
			};

			callback(null);
		});
	};

	/**
	 * User log out and session destroy.
	 *
	 * NOTE: this method doesn't guarantee destroy the session, only removing from it, all the data
	 * related to an authenticated user
	 *
	 * @param {Object} sess Connect Session object
	 * @param {Function} callback
	 */
	sess.userLogOut = function userLogOut(callback) {
		sess.destroy(callback);
	};


	sess.isUserAuthenticated = function isUserAuthenticated() {
		if ((sess.user) && (sess.user._id)) {
			return true;
		} else {
			return false;
		}
	};

	sess.getUser = function () {
		if (sess.isUserAuthenticated()) {
			sess.user;
		} else {
			return null;
		}
	};
}