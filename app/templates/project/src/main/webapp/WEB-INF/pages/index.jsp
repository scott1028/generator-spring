<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>${siteTitle}</title>

    <!-- build:css resources/styles/build.css -->
    <link href="resources/styles/master.less" rel="stylesheet/less" type="text/css">
    <script type="text/javascript" src="resources/lib/less.js"></script>
    <!-- endbuild -->
</head>

<body ng-app="app">
    <div class="navbar navbar-default navbar-fixed-top" role="navigation" ng-controller="NavbarCtrl">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">${siteTitle}</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Home</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right" ng-show="account.$resolved">
                    <li ng-show="account.email"><a href>{{account.email}}</a></li>
                    <li ng-show="account.email"><a href ng-click="logout()">Logout</a></li>
                    <li ng-hide="account.email"><a href="#/login">Login</a></li>
                    <li ng-hide="account.email"><a href="#/register">Register</a></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </div>
    <div class="container" ng-view=""></div>

    <script src="resources/lib/angular.js"></script>
    <script src="resources/lib/angular-resource.js"></script>
    <script src="resources/lib/angular-route.js"></script>
    <script src="resources/lib/angular-cookies.js"></script>
    <script src="resources/lib/lodash.js"></script>
    <script src="resources/lib/moment.js"></script>
    <script src="resources/lib/ui-bootstrap.js"></script>

    <!-- build:js resources/scripts/build.js -->
    <script src="resources/scripts/app.js"></script>

    <script src="resources/scripts/services/interceptor.js"></script>
    <script src="resources/scripts/services/auth.js"></script>
    <script src="resources/scripts/services/account.js"></script>

    <script src="resources/scripts/controllers/navbar/navbar.js"></script>
    <script src="resources/scripts/controllers/main/main.js"></script>
    <script src="resources/scripts/controllers/login/login.js"></script>
    <script src="resources/scripts/controllers/register/register.js"></script>
    <!-- endbuild -->
</body>
</html>
