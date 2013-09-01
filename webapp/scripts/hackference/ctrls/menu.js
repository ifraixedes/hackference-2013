(function (hfApp) {

	hfApp.controller('MenuCtrl', [
		'$rootScope', '$scope', '$location',
		function ($rootScope, $scope) {


			function userLogedIn () {
				$scope.menuItems = [
					{
						name: 'Events list',
						path: '/#/'
					}
				];
			}

			function userLogedOut () {
				$scope.menuItems = [
					{
						name: 'Events list',
						path: '/#/'
					},
					{
						name: 'Registration',
						path: '/#/registration'
					},
					{
						name: 'Login',
						path: '/#/login'
					},
				];
			}


			$rootScope.$on('userSession.logged', function(evt, isLogged) {

				if (isLogged) {
					userLogedIn();
				} else {
					userLogedOut();
				}

			});

			userLogedOut();



		}]);

})(window.angular.module('hfApp'));