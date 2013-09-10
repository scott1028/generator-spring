'use strict';

describe('Filter: <%= _.camelize(name) %>', function () {

    beforeEach(module('<%= _.camelize(appname) %>App'));

    var <%= _.camelize(name) %>;
    beforeEach(inject(function ($filter) {
        <%= _.camelize(name) %> = $filter('<%= _.camelize(name) %>');
    }));

    it('should return the input', function () {
        var text = 'angularjs';
        expect(<%= _.camelize(name) %>(text)).toBe(text);
    });
});