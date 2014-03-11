'use strict';

describe('Controller: <%= _.classify(name) %>Ctrl', function () {

  beforeEach(module('app'));

  var ctrl, $scope, mockBackend;
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
