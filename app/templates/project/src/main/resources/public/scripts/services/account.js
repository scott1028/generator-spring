'use strict';

app.factory('AccountService', function ($resource) {
  return $resource('account', {}, {
  });
});
