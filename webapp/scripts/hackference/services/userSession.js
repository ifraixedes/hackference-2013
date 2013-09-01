(function (hfApp) {

	hfApp.service('userSession', [
		'$rootScope',
		function ($rootScope) {

			var userIsLoggedIn = false;

			this.userLogIn = function () {
				userIsLoggedIn = true;
				$rootScope.$broadcast('userSession.logged', true);
			};

			this.userLogOut = function () {
				userIsLoggedIn = false;
				$rootScope.$broadcast('userSession.logged', false);
			};

			this.isUserLoggedIn = function () {
				return userIsLoggedIn;
			};

		}]);

})(window.angular.module('hfApp'));
