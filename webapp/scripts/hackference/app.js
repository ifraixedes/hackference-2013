(function (angular) {

  angular.module('hfApp', ['ifcDirectives']).config([
    '$routeProvider',
    function ($routes) {

      $routes.when('/', {
        templateUrl: 'views/home.html',
				controller: 'HomeCtrl'
      });

	    $routes.when('/event', {
		    templateUrl: 'views/event.html',
		    controller: 'EventCtrl'
	    });


	    $routes.when('/registration', {
		    templateUrl: 'views/registration.html',
		    controller: 'RegistrationCtrl'
	    });

	    $routes.when('/login', {
		    templateUrl: 'views/login.html',
		    controller: 'LoginCtrl'
	    });


      $routes.otherwise({
        redirect: '/'
      });

    }
  ]);

})(window.angular);
