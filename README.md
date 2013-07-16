# Spring/Maven + Angular Generator [![Build Status](https://secure.travis-ci.org/countableSet/generator-spring.png?branch=master)](https://travis-ci.org/countableSet/generator-spring)

A generator for Yeoman.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-spring`
- Run: `yo spring`
- Run tomcat: `mvn tomcat7:run -Dspring.profiles.active=local`
- Run tests: `mvn test`
- View from: `http://localhost/{{abbreviation}}`

## Generators
* [spring](#spring)
* [spring:controller](#controller)
* [spring:directive](#directive)
* [spring:factory](#factory)
* [spring:route](#route)
* [spring:service](#service)
* [spring:view](#view)

**Note: Generators are to be run from the root directory of your app.**

### Spring
Sets up a new Spring MVC App with AngularJS, generating all the boilerplate you need to get started.

Example:
```bash
yo spring
```

### Controller
Generates a controller in `src/main/webapp/resources/scripts/controllers`.

Example:
```bash
yo spring:controller user
```

Produces `src/main/webapp/resources/scripts/controllers/user.js`:
```javascript
angular.module('myMod').controller('UserCtrl', function ($scope) {
  // ...
});
```

### Directive
Generates a directive in `src/main/webapp/resources/scripts/directives`.

Example:
```bash
yo spring:directive myDirective
```

Produces `src/main/webapp/resources/scripts/directives/myDirective.js`:
```javascript
angular.module('myMod').directive('myDirective', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      element.text('this is the myDirective directive');
    }
  };
});
```

### Factory
Generates an AngularJS factory.

Example:
```bash
yo spring:factory myService
```

Produces `src/main/webapp/resources/scripts/services/myService.js`:
```javascript
angular.module('myMod').factory('myService', function () {
  // ...
});
```

### Route
Generates a controller and view, and configures a route in `src/main/webapp/resources/scripts/app.js` connecting them.

Example:
```bash
yo spring:route myroute
```

Produces `src/main/webapp/resources/scripts/controllers/myroute.js`:
```javascript
angular.module('myMod').controller('MyrouteCtrl', function ($scope) {
  // ...
});
```

Produces `src/main/webapp/resources/views/myroute.html`:
```html
<p>This is the myroute view</p>
```

### Service

### View
Generates an HTML view file in `src/main/webapp/resources/views`.

Example:
```bash
yo spring:view user
```

Produces `src/main/webapp/resources/views/user.html`:
```html
<p>This is the user view</p>
```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
