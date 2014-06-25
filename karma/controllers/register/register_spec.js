'use strict';

describe('Controller: RegisterCtrl', function () {

  var accountInfo = {id: 1, email: 'test@example.com', firstName: 'Test', lastName: 'User'};
  var peopleInfo = [{id: 1, firstName: 'John', lastName: 'Smith'}, {id: 2, firstName: 'Jane', lastName: 'Smith'}];

  beforeEach(module('app'));

  var ctrl, scope, authSharedService, mockBackend;

  beforeEach(inject(function ($injector) {
    var rootScope = $injector.get('$rootScope');
    var controller = $injector.get('$controller');

    mockBackend = $injector.get('$httpBackend');
    authSharedService = $injector.get('AuthSharedService');
    scope = rootScope.$new();

    spyOn(authSharedService, 'register');

    ctrl = controller('RegisterCtrl', {
      $scope: scope,
      AuthSharedService: authSharedService
    });

    mockBackend.whenGET('account').respond(accountInfo);
  }));

  it('should load register controller', function () {
    expect(!!ctrl).toBe(true);
  });

  it('should call register in auth service', function () {
    scope.register();
    expect(authSharedService.register).toHaveBeenCalled();
  });

});