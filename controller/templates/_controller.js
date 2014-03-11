'use strict';

angular.module('app').controller('<%= _.classify(name) %>Ctrl', function ($scope) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
});
