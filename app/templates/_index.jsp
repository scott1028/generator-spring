<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
	<title><%= _.unescape('${siteTitle}') %></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="stylesheet" type="text/css" href="resources/styles/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="resources/styles/bootstrap-override.css"/>

    <!-- build:css resources/css/build.css -->
    <link rel="stylesheet/less" type="text/css" href="resources/styles/project.less" />
    <script type="text/javascript" src="resources/lib/less.js"></script>
    <!-- endbuild -->
</head>
<body ng-app="<%= _.camelize(appname) %>App">
	<div class="navbar navbar-fixed-top" ng-controller="MainCtrl">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="../">
                    <div><%= _.unescape('${siteTitle}') %></div>
                    <em>A University of California EH&amp;S System</em>
                </a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#/">Home</a></li>
                </ul>
                <div class="nav navbar-user">
                    <span ng-if="profile.currentUser != null" ng-bind="profile.currentUser.firstName + ' ' + profile.currentUser.lastName"></span>
                    <span ng-if="profile.currentUser == null"><a href="{{profile.shibbolethUrl}}">Log in</a></span>
                    <span ng-if="profile.devTool">|<a href="#/devtool">Dev Tools</a></span>
                </div>
            </div>
        </div>
    </div>
	
	<div class="container" ng-view=""></div>
	
	<script src="resources/lib/angular.js"></script>
    <script src="resources/lib/angular-resource.js"></script>
    <script src="resources/lib/angular-route.js"></script>
    <script src="resources/lib/lodash.js"></script>
    <script src="resources/lib/moment.js"></script>
    <script src="resources/lib/ui-bootstrap.js"></script>
    <script src="http://localhost:35729/livereload.js"></script>

	<!-- build:js({.tmp,app}) scripts/scripts.js -->
	<script src="resources/scripts/app.js"></script>
	<script src="resources/scripts/controllers/main.js"></script>
	<!-- endbuild -->
	
	<script>
	var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
	(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
	g.src='//www.google-analytics.com/ga.js';
	s.parentNode.insertBefore(g,s)}(document,'script'));
	</script>
</body>
</html>