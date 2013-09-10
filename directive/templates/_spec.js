'use strict';

describe('Directive: <%= _.camelize(name) %>', function () {
	beforeEach(module('<%= _.camelize(appname) %>App'));

	var element;

	it('should do something', inject(function ($rootScope, $compile) {
		expect(true).toBeTruthy();
	}));
});
