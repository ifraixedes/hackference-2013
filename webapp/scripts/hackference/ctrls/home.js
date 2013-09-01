(function (hfApp) {

	hfApp.controller('HomeCtrl', [
		'$scope', '$location',
		function ($scope, $location) {

			$scope.showEvent = function (eventUri, talksUri, commentsUri) {
				$location.search({
					uri: eventUri,
					talks_uri: talksUri,
					comments_uri: commentsUri
				});

				$location.path('/event');
			}

		}]);

})(window.angular.module('hfApp'));