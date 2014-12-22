"use strict"

var gui = require('nw.gui'),
	win = gui.Window.get(),
	cagestudio = angular.module('CageStudioApp', ['ngRoute', 'firebase']);

cagestudio.filter('dateFilter', function() {
	return function(dateSTR) {
		return Date.parse(dateSTR);
	}
});

cagestudio.filter('unsafe', ['$sce', function($sce) {
	return function(val) {
		if (val == undefined) return "";
		if (val["__cdata"])
			return $sce.trustAsHtml(val["__cdata"]);
		else
			return $sce.trustAsHtml(val);
	};
}]);

cagestudio.filter('summary', [function() {
	var getSummary = function(text) {
		var start_ptn = /(<[^>]+>)*/gmi,
			end_ptn = /<\/?\w+>$/,
			space_ptn = /(&nbsp;)*/;
		return text.replace(start_ptn, "").replace(end_ptn).replace(space_ptn, "");
	}
	return function(val) {
		if (val == undefined) return "";
		if (val["__cdata"])
			return getSummary(val["__cdata"]);
		else
			return getSummary(val);
	};
}]);

cagestudio.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'NewsController',
			templateUrl: 'apps/views/news.html'
		})
		.when('/news/:feedId', {
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

cagestudio.factory('getFeed', ['$http', function($http) {

	var x2js = new X2JS();

	var isfun = function(callback) {
		return typeof callback == 'function';
	}

	return function(url, callback) {
		$http.get(url).
		success(function(data, status, headers, config) {
			if (isfun(callback)) {
				callback(x2js.xml_str2json(data).rss);
			}
		}).
		error(function(data, status, headers, config) {

		});
	}

}])

cagestudio.controller('IndexController', [
		'$scope',
		'$location',
		'$firebase',
		'getFeed',
		function($scope, $location, $firebase, getFeed) {

			var ref = new Firebase("https://bitcage.firebaseio.com/feeds"),
				sync = $firebase(ref),
				tempFeed;
			$scope.feeds = sync.$asArray();

			$scope.addFeed = function() {
				var url = $scope.url;
				if (!url) return;
				getFeed(url, function(result) {
					$scope.feeds.$add({
						name: result.channel.title.substring(0, 15),
						url: url
					});
					$scope.url = "";
				})
			}

			$scope.setEdit = function(feed) {
				$scope.targetFeed = feed;
				tempFeed = {
					name: feed.name,
					url: feed.url
				}
			}

			$scope.setDelete = function(feed) {
				$scope.targetFeed = feed;
			}

			$scope.cancel = function() {
				$scope.targetFeed.name = tempFeed.name;
				$scope.targetFeed.url = tempFeed.url;
			}

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
				if ($scope.isMaximized) {
					$scope.isMaximized = false;
					win.unmaximize();
				} else {
					$scope.isMaximized = true;
					win.maximize();
				}
			}
		}
	])
	.controller('NewsController', [
		'$scope',
		'getFeed',
		'$firebase',
		'$routeParams',
		function($scope, getFeed, $firebase, $routeParams) {
			var ref = new Firebase("https://bitcage.firebaseio.com/feeds"),
				sync = $firebase(ref),
				list = sync.$asArray();
			$.AMUI.progress.configure({
				showSpinner: false
			});
			$.AMUI.progress.start();

			$scope.list = [];
			$scope.isnews = true;

			var isArray = function(v) {
				return toString.apply(v) === '[object Array]';
			}

			var toArray = function(obj) {
				if (isArray(obj)) return obj;
				return [obj];
			}

			var show = function(url) {
				getFeed(url, function(result) {
					$.AMUI.progress.done();
					$scope.list = toArray(result.channel.item);
					$scope.title = result.channel.title;
				})
			}

			list.$loaded().then(function() {

				if (!$routeParams.feedId) {
					show(list[0].url);
					return;
				}
				var feed = list.$getRecord($routeParams.feedId);
				show(feed.url);

			});

			$scope.show = function($event, $index) {
				if ($event) $event.preventDefault();
				$scope.article = $scope.list[$index];
			}

		}
	])
	.controller('MusicController', ['$scope', function($scope) {

		$scope.ismusic = true;

	}])