'use strict';

angular.module('app').factory('AccountService', function ($resource) {
  return $resource('account', {}, {
  });
});
