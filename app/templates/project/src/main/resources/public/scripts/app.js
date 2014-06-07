'use strict';

/*jshint -W079 */
var app = angular.module('app', ['auth-interceptor', 'ngRoute', 'ngResource', 'ngCookies']);

app.config(function ($routeProvider, USER_ROLES) {
  $routeProvider
    .when('/', {
      templateUrl: 'scripts/controllers/main/main.html',
      controller: 'MainCtrl',
      access: { authorizedRoles: [USER_ROLES.all] }
    })
    .when('/login', {
      templateUrl: 'scripts/controllers/login/login.html',
      controller: 'LoginCtrl',
      access: { authorizedRoles: [USER_ROLES.all] }
    })
    .when('/register', {
      templateUrl: 'scripts/controllers/register/register.html',
      controller: 'RegisterCtrl',
      access: { authorizedRoles: [USER_ROLES.all] }
    })
    .otherwise({
      redirectTo: '/',
      access: { authorizedRoles: [USER_ROLES.all] }
    });
});

app.run(function ($rootScope, $location, AuthSharedService, AccountService, Session, USER_ROLES) {
  $rootScope.account = AccountService.get();

  $rootScope.$on('event:auth-registerLogin', function (evt, data) {
    AuthSharedService.login(data);
  });

  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login').replace();
  });

  $rootScope.$on('event:auth-loginConfirmed', function() {
    console.log('login confirmed');
  });

  $rootScope.$on('event:auth-loginCancelled', function() {
    $location.path('');
  });

  $rootScope.$on('event:auth-notAuthorized', function() {
    $location.path('/notauthorized');
  });

  $rootScope.$on('$routeChangeStart', function (event, next) {
    if (!!next.redirectTo) { return; }
    $rootScope.authenticated = AuthSharedService.isAuthenticated();
    $rootScope.isAuthorized = AuthSharedService.isAuthorized;
    $rootScope.userRoles = USER_ROLES;
    $rootScope.account = Session;

    var authorizedRoles = next.access.authorizedRoles;
    if (!AuthSharedService.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      if (AuthSharedService.isAuthenticated()) {
        $rootScope.$broadcast('event:auth-notAuthorized');
      } else {
        $rootScope.$broadcast('event:auth-loginRequired');
      }
    }
  });
});

app.constant('USER_ROLES', {
  all: '*',
  admin: 'ROLE_ADMIN',
  user: 'ROLE_USER'
});
