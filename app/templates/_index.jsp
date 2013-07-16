<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
	<title><%= siteTitle %></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="stylesheet" type="text/css" href="resources/components/bootstrap/docs/assets/css/bootstrap.css"/>
	<link rel="stylesheet" type="text/css" href="resources/styles/project.css"/>
	<link rel="stylesheet" type="text/css" href="resources/components/bootstrap/docs/assets/css/bootstrap-responsive.css"/>
	<link rel="stylesheet" type="text/css" href="resources/styles/bootstrap-override.css"/>
	
	<!--[if lt IE 9]>
	<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body ng-app="<%= _.camelize(appname) %>App">
	<div class="navbar navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container-fluid">
				<button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="brand" href="/">
					<div><%= _.unescape('${siteTitle}') %></div>
					<em class="sub-brand">A University of California EH&amp;S System</em>
				</a>
				<div class="nav-collapse collapse">
					<ul class="nav">
						<li class="home"><a href="/">Home</a></li>
					</ul>
					<div class="nav pull-right user-info">
						<a href="https://ermspqa.ucop.edu/<%= _.slugify(abbreviation) %>-<%= extras.type %>" class="login login-btn">Log in</a>   
						|<a href='spoof' class="login login-btn">Spoof</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="container-fluid" ng-view=""></div>
	
	<script src="resources/components/angular/angular.js"></script>
	<script src="resources/components/angular-resource/angular-resource.js"></script>

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