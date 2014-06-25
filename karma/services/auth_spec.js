'use strict';

describe('Service: AuthSharedService', function () {

  var accountInfo = {id: 1, email: 'test@example.com', firstName: 'Test', lastName: 'User'};
  var accountRegister = {email: 'test@example.com', password: 'password', firstName: 'Test', lastName: 'User'};

  beforeEach(module('app'));

  var AuthSharedService, AuthService, mockBackend, rootScope, Session;
  beforeEach(inject(function ($injector) {
    AuthSharedService = $injector.get('AuthSharedService');
    AuthService = $injector.get('authService');
    mockBackend = $injector.get('$httpBackend');
    rootScope = $injector.get('$rootScope');
    Session = $injector.get('Session');
    spyOn(rootScope, '$broadcast').and.callThrough();
    spyOn(AuthService, 'loginConfirmed');
    spyOn(AuthService, 'loginCancelled');
    spyOn(Session, 'destroy');
    spyOn(Session, 'create');

    mockBackend.whenGET('account').respond(accountInfo);
    mockBackend.whenPOST('auth/login').respond('{}');
    mockBackend.whenGET('auth/logout').respond('{}');
    mockBackend.whenPOST('account/register').respond(accountInfo);
  }));

  it('should load auth shared service', function () {
    expect(!!AuthSharedService).toBe(true);
  });

  it('should login and call auth service', function () {
    var data = {email: 'test@example.com', password: 'password'};
    AuthSharedService.login(data);
    mockBackend.flush();
    expect(AuthService.loginConfirmed).toHaveBeenCalled();
    expect(Session.create).toHaveBeenCalled();
  });

  it('should logout and call auth service', function () {
    AuthSharedService.logout();
    mockBackend.flush();
    expect(AuthService.loginCancelled).toHaveBeenCalled();
    expect(Session.destroy).toHaveBeenCalled();
  });

  it('should register and call broadcast', function () {
    AuthSharedService.register(accountRegister);
    mockBackend.flush();
    expect(rootScope.$broadcast).toHaveBeenCalledWith('event:auth-registerLogin', accountRegister);
    mockBackend.expectPOST('auth/login', accountRegister);
    expect(AuthService.loginConfirmed).toHaveBeenCalled();
  });

});
