(function (hfApp) {

	hfApp.controller('RegistrationCtrl', [
		'$scope', '$http', '$location', 'userSession',
		function ($scope, $http, $location, userSession) {

			$scope.error = false;

			$scope.submit = function () {

				var userData = {
					email: $scope.email,
					password: $scope.password
				};

				if ($scope.telephone) {
					userData.telephone = $scope.telephone;
				}

				$http.post('/user/registration', userData).success(function () {
						userSession.userLogIn();
						$location.path('/');
					})
					.error(function (err) {

						$scope.error = true;
					});
			};


			$scope.$watch('password', function (newValue) {
				if (newValue === $scope.pwdConfirmation) {
					$scope.registration.password.$setValidity('notEqual', true);
				} else {
					$scope.registration.password.$setValidity('notEqual', false);
				}
			});

			$scope.$watch('pwdConfirmation', function (newValue) {

				if (newValue === $scope.pwdConfirmation) {
					$scope.registration.password.$setValidity('notEqual', true);
				} else {
					$scope.registration.password.$setValidity('notEqual', false);
				}

			});


		}]);

})(window.angular.module('hfApp'));