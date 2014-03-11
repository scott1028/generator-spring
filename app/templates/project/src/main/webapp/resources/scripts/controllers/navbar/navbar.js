'use strict';

angular.module('app').controller('NavbarCtrl', function ($rootScope, $scope, AuthSharedService) {
  $scope.account = $rootScope.account;
  $rootScope.$watch('account', function (newValue) {
    $scope.account = newValue;
  });
  $scope.input = {email: 'test@example.com', password: 'password'};
  $scope.logout = function () {
    AuthSharedService.logout();
  };
});