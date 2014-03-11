'use strict';

angular.module('app').factory('AuthSharedService', function ($rootScope, $http, authService) {
  return {
    login: function (param) {
      var data ="j_username=" + param.email +"&j_password=" + param.password +"&submit=Login";
      $http.post('auth/login', data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          ignoreAuthModule: 'ignoreAuthModule'
        }).success(function () {
          $rootScope.authenticationError = false;
          authService.loginConfirmed();
        }).error(function () {
          console.log('auth shared service login error');
          $rootScope.authenticationError = true;
        });
    },
    logout: function () {
      $rootScope.authenticationError = false;
      $http.get('auth/logout').success(function () {
        $rootScope.account = {$resolved: true};
        authService.loginCancelled();
      });
    },
    register: function (data, errorCallback) {
      $http.post('account/register', data).success(function () {
        $rootScope.$broadcast('event:auth-registerLogin', data);
      }).error(errorCallback);
    }
  };
});