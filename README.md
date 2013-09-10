# Spring/Maven + Angular Generator [![Build Status](https://secure.travis-ci.org/countableSet/generator-spring.png?branch=master)](https://travis-ci.org/countableSet/generator-spring)

A generator for Yeoman.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-spring`
- Run: `yo spring`
- Run tomcat: `mvn tomcat7:run`
- Run tests: `mvn test`
- View from: `http://localhost/{{abbreviation}}`

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
echo:test rachel$ yo spring:controller landing
   create src/main/webapp/resources/scripts/controllers/landing/landing.js
   create src/main/webapp/resources/scripts/controllers/landing/landing.html
   create src/main/webapp/karma/spec/controllers/landing/landing.js
echo:test rachel$ yo spring:controller management/workload
   create src/main/webapp/resources/scripts/controllers/management/workload/workload.js
   create src/main/webapp/resources/scripts/controllers/management/workload/workload.html
   create src/main/webapp/karma/spec/controllers/management/workload/workload.js
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
echo:test rachel$ yo spring:directive menu
   create src/main/webapp/resources/scripts/directives/menu.js
   create src/main/webapp/karma/spec/directives/menu.js
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
echo:test rachel$ yo spring:filter status
   create src/main/webapp/resources/scripts/filters/status.js
   create src/main/webapp/karma/spec/filters/status.js
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
echo:test rachel$ yo spring:service schedule
   create src/main/webapp/resources/scripts/services/schedule.js
   create src/main/webapp/karma/spec/services/schedule.js
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
