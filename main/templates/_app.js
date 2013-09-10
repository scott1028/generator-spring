'use strict';

angular.module('<%= _.camelize(appname) %>App', ['ngRoute', 'ngResource']).config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'resources/scripts/controllers/main/main.html',
			controller: 'MainCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});
