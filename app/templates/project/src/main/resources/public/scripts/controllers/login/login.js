'use strict';

app.controller('LoginCtrl', function ($scope, AuthSharedService) {
  $scope.input = {email: 'test@example.com', password: 'password'};
  $scope.login = function () {
    AuthSharedService.login($scope.input);
  };
});
