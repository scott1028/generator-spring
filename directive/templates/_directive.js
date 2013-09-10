'use strict';

angular.module('<%= _.camelize(appname) %>App').directive('<%= _.camelize(name) %>', function () {
	return {
		restrict: 'A',
		link: function postLink(scope, element, attrs) {
		}
	};
});
