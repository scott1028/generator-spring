'use strict';

describe('Controller: MainCtrl', function () {

  var accountInfo = {id: 1, email: 'test@example.com', firstName: 'Test', lastName: 'User'};

  beforeEach(module('app'));

  var ctrl, scope, mockBackend;

  beforeEach(inject(function ($injector) {
    var rootScope = $injector.get('$rootScope');
    var controller = $injector.get('$controller');

    mockBackend = $injector.get('$httpBackend');
    scope = rootScope.$new();

    ctrl = controller('MainCtrl', {
      $scope: scope
    });

    mockBackend.whenGET('account').respond(accountInfo);
  }));

  it('should load main controller', function () {
    expect(!!ctrl).toBe(true);
  });
});
