(function (hfApp) {

	hfApp.controller('EventCtrl', [
		'$scope', '$location',
		function ($scope, $location) {


			$scope.eventUri = $location.search().uri;
			$scope.eventTalksUri = $location.search().talks_uri;
			$scope.eventCommentsUri = $location.search().comments_uri;

		}]);

})(window.angular.module('hfApp'));