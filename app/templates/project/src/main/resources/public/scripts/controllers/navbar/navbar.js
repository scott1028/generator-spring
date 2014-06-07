'use strict';

app.controller('NavbarCtrl', function ($rootScope, $scope, AuthSharedService) {
  $scope.account = $rootScope.account;
  $scope.authenticated = $rootScope.authenticated;
  $rootScope.$watch('account', function (newValue) {
    $scope.account = newValue;
  });
  $rootScope.$watch('authenticated', function (newValue) {
    $scope.authenticated = newValue;
  });
  $scope.input = {email: 'test@example.com', password: 'password'};
  $scope.logout = function () {
    AuthSharedService.logout();
  };
});
