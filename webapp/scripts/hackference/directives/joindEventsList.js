/**
 * @license Ivan Fraixedes Cugat
 * (c) 2013
 * License: MIT
 */

(function (angular) {
	'use strict';

	var ifcDirModule = angular.module('ifcDirectives');


	ifcDirModule.directive('joindEventsList', [
		'$http','$window',
		function ($http, $window) {

			return {
				restrict: 'EACM',
				replace: false,
				scope: {
					resultsPerPage: '@results',
					currentPage: '@page',
					selectone: '&'
				},
				templateUrl: '/scripts/hackference/directives/views/joindEventsList.html',
				link: function (scope, elem, attrs) {

					function pullEvents(resultsPerPage, pageNum) {

						$http.jsonp('http://api.joind.in/v2.1/events', {
							params: {
								start: pageNum,
								resultsperpage: resultsPerPage,
								callback: 'callback=JSON_CALLBACK'
							}
						}).success(function (eventsListObj) {
								scope.eventsList = eventsListObj.events;
								scope.isError = false;
								scope.error = null;
								scope.disableNext = (eventsListObj.events.length < resultsPerPage) ? true : false;

							})
							.error(function () {
								scope.eventsList = null;
								scope.isError = true;
								scope.error = 'Please refresh your app, a non-common error happened';
							});
					}

					function nextPage() {
						currentPage++;
						scope.currentPage = currentPage;
						scope.disablePrev = (currentPage) ? false : true;

						pullEvents(resultsPerPage,  currentPage);
					}

					function previousPage() {
						currentPage--;
						scope.disablePrev = (currentPage) ? false : true;
						scope.currentPage = currentPage;
						pullEvents(resultsPerPage,  currentPage);
					}

					function eventClick (event) {
						scope.selectone({
							eventUri: event.uri,
							talksUri: event.talks_uri,
							commentsUri: event.comments_uri,

						});
					}


					var resultsPerPage = 20;
					var currentPage = 0;

					if (scope.resultsPerPage) {
						resultsPerPage = $window.parseInt(scope.resultsPerPage, 10);

						if ($window.isNaN(resultsPerPage)) {
							resultsPerPage = 20;
						}
					}

					if (scope.currentPage) {
						currentPage = $window.parseInt(scope.currentPage, 10);

						if ($window.isNaN(currentPage)) {
							currentPage = 0;
						}
					}

					scope.disablePrev = (currentPage) ? false : true;
					scope.nextPage = nextPage;
					scope.previousPage = previousPage;
					scope.eventClick = eventClick;


					pullEvents(resultsPerPage, currentPage);

				}
			}

		}
	]);

})(window.angular);
