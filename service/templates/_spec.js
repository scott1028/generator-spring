'use strict';

describe('Service: <%= _.classify(name) %>Service', function () {

  beforeEach(module('app'));

  var <%= _.classify(name) %>Service, mockBackend;
  beforeEach(inject(function (_<%= _.classify(name) %>Service_, _$httpBackend_) {
    <%= _.classify(name) %>Service = _<%= _.classify(name) %>Service_;
    mockBackend = _$httpBackend_;
  }));

  it('should do something', function () {
    expect(!!<%= _.classify(name) %>Service).toBe(true);
  });
});
