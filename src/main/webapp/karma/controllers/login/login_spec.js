'use strict';

describe('Controller: LoginCtrl', function () {

  var accountInfo = {id: 1, email: 'test@example.com', firstName: 'Test', lastName: 'User'};

  beforeEach(module('app'));

  var ctrl, scope, mockBackend;

  beforeEach(inject(function ($injector) {
    var rootScope = $injector.get('$rootScope');
    var controller = $injector.get('$controller');

    mockBackend = $injector.get('$httpBackend');
    scope = rootScope.$new();

    ctrl = controller('LoginCtrl', {
      $scope: scope,
      AuthSharedService: $injector.get('AuthSharedService')
    });

    mockBackend.whenGET('account').respond(accountInfo);
  }));

  it('should load login controller', function () {
    expect(!!ctrl).toBe(true);
  });

  it('should login', function () {
    scope.input = {email: 'test@example.com', password: 'password'};
    scope.login();
    mockBackend.expectPOST('auth/login', scope.input).respond('');
  });

});