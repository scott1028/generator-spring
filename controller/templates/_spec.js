'use strict';

describe('Controller: <%= _.classify(name) %>Ctrl', function () {
    // load the controller's module
    beforeEach(module('<%= _.camelize(appname) %>App'));

    var ctrl, $scope, mockBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        mockBackend = _$httpBackend_;
        $scope = $rootScope.$new();

        ctrl = $controller('<%= _.classify(name) %>Ctrl', {
            $scope: $scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});