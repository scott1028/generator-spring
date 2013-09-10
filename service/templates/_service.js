'use strict';

angular.module('<%= _.camelize(appname) %>App').factory('<%= _.classify(name) %>Service', function ($resource) {
	return $resource('api/<%= name.toLowerCase() %>/:id', {id: '@id'}, {
	});
});