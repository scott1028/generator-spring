'use strict';

angular.module('app').filter('<%= _.camelize(name) %>', function () {
  return function (input) {
    return input;
  };
});