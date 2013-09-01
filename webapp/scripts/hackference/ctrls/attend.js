(function (hfApp) {

	hfApp.controller('AttendCtrl', [
		'$rootScope', '$scope', '$http', '$location', 'userSession',
		function ($rootScope, $scope, $http, $location, userSession) {

			$scope.submit = function (eventUri) {

				$http.post('/event/attend', {
					url: eventUri
				}).success(function () {
						$location.path('/');
					})
					.error(function (err) {
						$scope.error = true;
					});
			};



			$rootScope.$on('userSession.logged', function(evt, isLogged) {

				if (isLogged) {
					$scope.dissabled = false;
				} else {
					$scope.dissabled = true;
				}

			});

			if (userSession.isUserLoggedIn()) {
				$scope.dissabled = false;
			} else {
				$scope.dissabled = true;
			}


		}]);

})(window.angular.module('hfApp'));