"use strict"

var gui = require('nw.gui'),
	win = gui.Window.get(),
	cagestudio = angular.module('CageStudioApp', ['ngRoute']);

cagestudio.filter('dateFilter', function() {
	return function(dateSTR) {
		return Date.parse(dateSTR);
	}
});

cagestudio.filter('unsafe', ['$sce', function($sce) {
	return function(val) {
		if (val == undefined) return "";
		return $sce.trustAsHtml(val["__cdata"]);
	};
}]);

cagestudio.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'NewsController',
			templateUrl: 'apps/views/news.html'
		})
		.when('/news', {
			controller: 'NewsController',
			templateUrl: 'apps/views/news.html'
		})
		.when('/music', {
			controller: 'MusicController',
			templateUrl: 'apps/views/music.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

cagestudio.controller('IndexController', ['$scope', '$location', function($scope, $location) {

		$scope.jump = function($event) {
			if ($event) $event.preventDefault();
			$location.path($event.target.getAttribute('href'));
		}

		$scope.isActive = function(route) {
			if (route == "/news" && $location.path() == "/") return true;
			return route === $location.path();
		}

		$scope.close = function() {
			win.close();
		}

		$scope.minimize = function() {
			win.minimize();
		}

		$scope.maximize = function() {
			console.log($scope.isMaximized)
			if ($scope.isMaximized) {
				$scope.isMaximized = false;
				win.unmaximize();
			} else {
				$scope.isMaximized = true;
				win.maximize();
			}
		}
	}])
	.controller('NewsController', [
		'$scope',
		'$http',
		function($scope, $http) {
			$scope.list = [];
			$scope.isnews = true;

			var x2js = new X2JS(),
				channel;

			$http.get('http://blog.jobbole.com/feed/').
			success(function(data, status, headers, config) {
				channel = x2js.xml_str2json(data).rss.channel;
				$scope.list = channel.item;
				$scope.title = channel.title;
			}).
			error(function(data, status, headers, config) {

			});

			$scope.show = function($event, $index) {
				if ($event) $event.preventDefault();
				$scope.article = $scope.list[$index];
			}

		}
	])
	.controller('MusicController', [function() {

		$scope.ismusic = true;

	}])