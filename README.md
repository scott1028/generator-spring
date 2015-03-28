# Spring/Gradle + Angular Generator

A generator for Yeoman. View sample generation in [sample-app branch](https://github.com/countableSet/generator-spring/tree/sample-app).

## Project/Build Information

| Status Name | Status |
| --- | --- |
| master branch build | [![Circle CI](https://circleci.com/gh/countableSet/generator-spring.svg?style=badge)](https://circleci.com/gh/countableSet/generator-spring) |
| sample-app branch build | [![Circle CI](https://circleci.com/gh/countableSet/generator-spring/tree/sample-app.svg?style=badge)](https://circleci.com/gh/countableSet/generator-spring/tree/sample-app) |
| dependencies | [![Dependencies](https://david-dm.org/countableset/generator-spring.png)](https://david-dm.org/countableset/generator-spring) |
| dev dependencies | [![devDependencies](https://david-dm.org/countableset/generator-spring/dev-status.png)](https://david-dm.org/countableset/generator-spring#info=devDependencies&view=table) |

## Getting started
- Make sure to have [yeoman](https://github.com/yeoman/yo) installed: `npm install -g yo`
- Install the generator: `npm install -g generator-spring` (Not currently available in npm)
- Generate Project: `yo spring`
- Run embedded jetty: `gradle bootRun`
- Run tests: `gradle test`
- Build jar: `gradle build`
- Run build jar: `java -jar build/libs/app-0.0.1.jar`
- `http://localhost:8080`

## JUnit Tests
``` bash
$ gradle test
:compileJava
:processResources UP-TO-DATE
:classes
:compileTestJava
:processTestResources UP-TO-DATE
:testClasses
:test

BUILD SUCCESSFUL

Total time: 17.699 secs
```

## Karma Tests
``` bash
$ grunt test
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
Generates a controller in `src/main/resources/public/scripts/controllers`.

Examples:
```bash
$ yo spring:controller landing
   create src/main/resources/public/scripts/controllers/landing/landing.js
   create src/main/resources/public/scripts/controllers/landing/landing.html
   create karma/controllers/landing/landing.js
$ yo spring:controller management/workload
   create src/main/resources/public/scripts/controllers/management/workload/workload.js
   create src/main/resources/public/scripts/controllers/management/workload/workload.html
   create karma/controllers/management/workload/workload.js
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
Generates a directive in `src/main/resources/public/scripts/directives`.

Example:
```bash
$ yo spring:directive menu
   create src/main/resources/public/scripts/directives/menu.js
   create karma/directives/menu.js
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
Generates a filter in `src/main/resources/public/scripts/filters`.

Example:
```bash
$ yo spring:filter status
   create src/main/resources/public/scripts/filters/status.js
   create karma/filters/status.js
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
Generates a factory 'service' in `src/main/resources/public/scripts/servies`.

Example:
```bash
$ yo spring:service schedule
   create src/main/resources/public/scripts/services/schedule.js
   create karma/services/schedule.js
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
