/**
 * @license Ivan Fraixedes Cugat
 * (c) 2013
 * License: MIT
 */

(function (angular) {
	'use strict';

	var ifcDirModule = angular.module('ifcDirectives');


	ifcDirModule.directive('joindEvent', [
		'$http',
		function ($http) {

			return {
				restrict: 'EACM',
				replace: false,
				scope: {
					eventUri: '@uri',
					talksUri: '@talks',
					commentsUri: '@comments'
				},
				templateUrl: '/scripts/hackference/directives/views/joindEvent.html',
				link: function (scope, elem, attrs) {

					function pullData(urisObj) {

						if (urisObj.eventUri) {
							$http.jsonp(urisObj.eventUri, {
								params: {
									verbose: 'yes',
									callback: 'callback=JSON_CALLBACK'
								}
							}).success(function (data) {
									scope.event = data.events[0];
								})
								.error(function () {
									scope.isError = true;
									scope.error = 'Please refresh your app, a non-common error happened';
								});
						}


						if (urisObj.talksUri) {
							$http.jsonp(urisObj.talksUri, {
								params: {
									verbose: 'yes',
									callback: 'callback=JSON_CALLBACK'
								}
							}).success(function (data) {
									scope.talks = data.talks;
								})
								.error(function () {
									scope.isError = true;
									scope.error = 'Please refresh your app, a non-common error happened';
								});
						}

						if (urisObj.commentsUri) {
							$http.jsonp(urisObj.commentsUri, {
								params: {
									verbose: 'yes',
									callback: 'callback=JSON_CALLBACK'
								}
							}).success(function (data) {
									scope.comments = data.comments;
								})
								.error(function () {
									scope.isError = true;
									scope.error = 'Please refresh your app, a non-common error happened';
								});
						}
					}

					scope.isError = false;
					pullData(scope);

				}
			}

		}
	]);

})(window.angular);
