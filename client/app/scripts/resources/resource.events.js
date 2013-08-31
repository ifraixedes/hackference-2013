//TODO: data hard-coded in client pull from server later
angular.module('resource.events', []);
angular.module('resource.events').factory('events', function () {
 	return [
 		{
 			id: 1,
 			name: "Helen Smith", 
 			description: "PHP Conf 2013"
 		}, 
 		{
 			id: 2,
 			name: "Don Peters", 
 			description: "Hack London 2013"
 		}];
});