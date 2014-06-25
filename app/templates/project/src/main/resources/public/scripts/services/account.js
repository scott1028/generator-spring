'use strict';

app.factory('AccountService', ['$resource', function ($resource) {
  return $resource('account', {}, {
  });
}]);
