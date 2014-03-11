'use strict';

angular.module('app', ['http-auth-interceptor', 'ngRoute', 'ngResource']).config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'resources/scripts/controllers/main/main.html',
      controller: 'MainCtrl'
    })
    .when('/login', {
      templateUrl: 'resources/scripts/controllers/login/login.html',
      controller: 'LoginCtrl'
    })
    .when('/register', {
      templateUrl: 'resources/scripts/controllers/register/register.html',
      controller: 'RegisterCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

angular.module('app').run(function ($rootScope, $location, AuthSharedService, AccountService) {
  $rootScope.account = AccountService.get();

  $rootScope.$on('event:auth-registerLogin', function (evt, data) {
    AuthSharedService.login(data);
  });

  $rootScope.$on('event:auth-loginRequired', function() {
    $rootScope.authenticated = false;
    $location.path('/login').replace();
  });

  $rootScope.$on('event:auth-authConfirmed', function() {
    $rootScope.authenticated = true;
    $rootScope.account = AccountService.get();

    if ($location.path() === "/login") {
      $location.path('/').replace();
    }
  });

  $rootScope.$on('event:auth-loginConfirmed', function() {
    $rootScope.authenticated = true;
    $rootScope.account = AccountService.get();
    $location.path('').replace();
  });

  $rootScope.$on('event:auth-loginCancelled', function() {
    $rootScope.authenticated = false;
    $location.path('');
  });
});
