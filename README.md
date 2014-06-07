# Spring/Maven + Angular Generator

[![Build Status](https://drone.io/github.com/countableSet/generator-spring/status.png)](https://drone.io/github.com/countableSet/generator-spring/latest) [![Dependencies](https://david-dm.org/countableset/generator-spring.png)](https://david-dm.org/countableset/generator-spring) [![devDependencies](https://david-dm.org/countableset/generator-spring/dev-status.png)](https://david-dm.org/countableset/generator-spring#info=devDependencies&view=table)

A generator for Yeoman.

## Getting started
- Make sure to have [yeoman](https://github.com/yeoman/yo) installed: `npm install -g yo`
- Install the generator: `npm install -g generator-spring` (Not currently available in npm)
- Generate Project: `yo spring`
- Run tomcat: `mvn tomcat7:run`
- Run tests: `mvn test`
- `http://localhost:8080/app`

## JUnit Tests
``` bash
echelon:spring rachel$ mvn test
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building spring test 0.0.1-SNAPSHOT
[INFO] ------------------------------------------------------------------------

-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running ch.example.demo.test.repository.AccountRepositoryTest
Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 4.09 sec

Results :

Tests run: 1, Failures: 0, Errors: 0, Skipped: 0

[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 8.820s
[INFO] Finished at: Mon Mar 10 22:14:00 PDT 2014
[INFO] Final Memory: 24M/226M
[INFO] ------------------------------------------------------------------------
```

## Karma Tests
``` bash
echelon:spring rachel$ grunt test
Running "jshint:all" (jshint) task
>> 7 files lint free.

Running "karma:continuous" (karma) task
INFO [karma]: Karma v0.10.9 server started at http://localhost:9876/
INFO [launcher]: Starting browser PhantomJS
INFO [PhantomJS 1.9.7 (Mac OS X)]: Connected on socket AwPksUPr2Zkn910XgkRH
PhantomJS 1.9.7 (Mac OS X): Executed 10 of 10 SUCCESS (0.168 secs / 0.039 secs)

Done, without errors.
```

## Generators
* [spring](#spring)
* [spring:controller](#controller)
* [spring:directive](#directive)
* [spring:filter](#filter)
* [spring:service](#service)

**Note: Generators are to be run from the root directory of your app.**

### Spring
Sets up a new Spring MVC App with AngularJS, generating all the boilerplate you need to get started.

Example:
```bash
yo spring
```

### Controller
Generates a controller in `src/main/webapp/resources/scripts/controllers`.

Examples:
```bash
$ yo spring:controller landing
   create src/main/webapp/resources/scripts/controllers/landing/landing.js
   create src/main/webapp/resources/scripts/controllers/landing/landing.html
   create src/main/webapp/karma/controllers/landing/landing.js
$ yo spring:controller management/workload
   create src/main/webapp/resources/scripts/controllers/management/workload/workload.js
   create src/main/webapp/resources/scripts/controllers/management/workload/workload.html
   create src/main/webapp/karma/controllers/management/workload/workload.js
```

```javascript
'use strict';

angular.module('demoApp').controller('ManagementWorkloadCtrl', function ($scope) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
});
```

### Directive
Generates a directive in `src/main/webapp/resources/scripts/directives`.

Example:
```bash
$ yo spring:directive menu
   create src/main/webapp/resources/scripts/directives/menu.js
   create src/main/webapp/karma/directives/menu.js
```

```javascript
'use strict';

angular.module('demoApp').directive('menu', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
    }
  };
});
```

### Filter
Generates a filter in `src/main/webapp/resources/scripts/filters`.

Example:
```bash
$ yo spring:filter status
   create src/main/webapp/resources/scripts/filters/status.js
   create src/main/webapp/karma/filters/status.js
```

```javascript
'use strict';

angular.module('demoApp').filter('status', function () {
    return function (input) {
        return input;
    };
});
```

### Service
Generates a factory 'service' in `src/main/webapp/resources/scripts/servies`.

Example:
```bash
$ yo spring:service schedule
   create src/main/webapp/resources/scripts/services/schedule.js
   create src/main/webapp/karma/services/schedule.js
```

```javascript
'use strict';

angular.module('demoApp').factory('ScheduleService', function ($resource) {
  return $resource('api/schedule/:id', {id: '@id'}, {
  });
});
```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
