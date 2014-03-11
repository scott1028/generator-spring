'use strict';

angular.module('app').directive('<%= _.camelize(name) %>', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
    }
  };
});
