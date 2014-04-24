'use strict';

describe('Service: AccountService', function () {

  beforeEach(module('app'));

  var AccountService, mockBackend;
  beforeEach(inject(function ($injector) {
    AccountService = $injector.get('AccountService');
    mockBackend = $injector.get('$httpBackend');
  }));

  it('should load account service', function () {
    expect(!!AccountService).toBe(true);
  });
});
