'use strict';

angular.module('<%= _.camelize(appname) %>App', []).config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'resources/views/main.html',
			controller: 'MainCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});
