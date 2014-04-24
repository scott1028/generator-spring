'use strict';

angular.module('auth-interceptor', ['app-location-buffer']).factory('authService', function($rootScope, locationBuffer) {
  return {
    loginConfirmed: function(data) {
      $rootScope.$broadcast('event:auth-loginConfirmed', data);
      locationBuffer.retry();
    },

    loginCancelled: function(data) {
      locationBuffer.reject();
      $rootScope.$broadcast('event:auth-loginCancelled', data);
    }
  };
})
.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope, $q, $location, locationBuffer) {
    return {
      responseError: function(rejection) {
        if (rejection.status === 401 && !rejection.config.ignoreAuthModule) {
          var deferred = $q.defer();
          locationBuffer.set($location.path());
          $rootScope.$broadcast('event:auth-loginRequired', rejection);
          return deferred.promise;
        }
        return $q.reject(rejection);
      }
    };
  });
});

angular.module('app-location-buffer', []).factory('locationBuffer', function($injector) {
  var buffer = '';
  var $location;

  function navigateToLocation (path) {
    $location = $location || $injector.get('$location');
    $location.path(path);
  }

  return {
    get: function () {
      return buffer;
    },
    set: function (path) {
      buffer = path;
    },
    reject: function () {
      buffer = '';
    },
    retry: function () {
      navigateToLocation(buffer);
    }
  };
});
