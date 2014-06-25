'use strict';

app.controller('MainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.message = 'Hello World!';
  $scope.account = $rootScope.account;
}]);
