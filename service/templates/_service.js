'use strict';

angular.module('app').factory('<%= _.classify(name) %>Service', function ($resource) {
  return $resource('api/<%= name.toLowerCase() %>/:id', {id: '@id'}, {
  });
});