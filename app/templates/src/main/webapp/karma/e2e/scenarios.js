'use strict';

describe('Demo App', function() {

	describe('manage organization', function() {
		beforeEach(function() {
			browser().navigateTo('/<%= _.slugify(abbreviation) %>/');
		});

		it('should load correctly', function () {
			expect(browser().location().url()).toBe("/");
		});
	});
});