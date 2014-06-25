'use strict';

app.factory('AuthSharedService', ['$rootScope', '$http', '$cookieStore', 'AccountService', 'authService', 'Session', function ($rootScope, $http, $cookieStore, AccountService, authService, Session) {
  return {
    login: function (param) {
      var data ="j_username=" + param.email +"&j_password=" + param.password +"&submit=Login";
      $http.post('auth/login', data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          ignoreAuthModule: 'ignoreAuthModule'
        }).success(function () {
          AccountService.get(function (data) {
            Session.create(data.id, data.email, data.firstName, data.lastName, data.authorities);
            authService.loginConfirmed();
          });
        }).error(function () {
          console.log('auth shared service login error');
          Session.destroy();
        });
    },
    logout: function () {
      $http.get('auth/logout').success(function () {
        Session.destroy();
        authService.loginCancelled();
      });
    },
    register: function (data, errorCallback) {
      $http.post('account/register', data).success(function () {
        $rootScope.$broadcast('event:auth-registerLogin', data);
      }).error(errorCallback);
    },
    isAuthorized: function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        if (authorizedRoles === '*') {
          return true;
        }
        authorizedRoles = [authorizedRoles];
      }

      var isAuthorized = false;
      angular.forEach(authorizedRoles, function (authority) {
        var authorized = (!!Session.email && Session.authorities.indexOf(authority) !== -1);
        if (authorized || authority === '*') {
          isAuthorized = true;
        }
      });
      return isAuthorized;
    },
    isAuthenticated: function () {
      if (!Session.email) {
        if (!!$cookieStore.get('account')) {
          var account = JSON.parse($cookieStore.get('account'));
          Session.create(account.id, account.email, account.firstName, account.lastName, account.authorities);
          $rootScope.account = Session;
        }
      }
      return !!Session.email;
    }
  };
}]);

angular.module('app').factory('Session', ['$cookieStore', function ($cookieStore) {
  this.create = function (id, email, firstName, lastName, authorities) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.authorities = authorities;
    $cookieStore.put('account', JSON.stringify(this));
  };
  this.destroy = function () {
    this.id = null;
    this.email = null;
    this.firstName = null;
    this.lastName = null;
    this.authorities = null;
    $cookieStore.remove('account');
  };
  return this;
}]);
