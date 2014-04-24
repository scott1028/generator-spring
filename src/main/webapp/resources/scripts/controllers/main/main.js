'use strict';

angular.module('app').controller('MainCtrl', function ($scope, $rootScope) {
  $scope.message = 'Hello World!';
  $scope.account = $rootScope.account;
});
