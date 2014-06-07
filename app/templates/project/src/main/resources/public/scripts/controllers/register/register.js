'use strict';

app.controller('RegisterCtrl', function ($scope, AuthSharedService) {
  $scope.input = {email: 'test@example.com', password: 'password'};
  $scope.register = function () {
    var errorCallback = function () {
      console.log('RegisterCtrl: account already exists');
      $scope.alreadyExists = true;
    };
    AuthSharedService.register($scope.input, errorCallback);
  };
});
