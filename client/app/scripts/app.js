'use strict';

angular.module('app', ['resource.events']);

angular.module('app').config(function ($routeProvider) {
    $routeProvider.when('/events',
        {
            templateUrl: 'views/events.html',
            controller: 'EventsController'
        })
        .when('/events/:id',
        {
            templateUrl: 'views/event.html',
            controller: 'EventController'
        })
        .otherwise({
          redirectTo: '/events'
        });
  });


angular.module('app').controller('EventsController', ['$scope', '$location', 'events', function ($scope, $location, events) {
    $scope.events = events;
    $scope.gotoEvent = function (event) {
           $location.path('/events/' + event.id);
       };
}]);

angular.module('app').controller('EventController', ['$scope', 'events', function ($scope, events) {
    
    
}]);

angular.module('app').controller('HeaderController', ['$scope', '$location',
    function ($scope, $location) {
        $scope.routeIs = function (route) {
            return $location.path().indexOf(route) > 0;
        };
    }]);
