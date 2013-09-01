(function (hfApp) {

	hfApp.controller('LoginCtrl', [
		'$scope', '$http', '$location', 'userSession',
		function ($scope, $http, $location, userSession) {

			$scope.error = false;

			$scope.submit = function () {
				$http.post('/user/login', {
					email: $scope.email,
					password: $scope.password
				}).success(function () {
						userSession.userLogIn();
						$location.path('/');
					})
					.error(function (err) {

						$scope.error = true;
					});
			};

		}]);

})(window.angular.module('hfApp'));