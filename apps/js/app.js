"use strict"

angular.module('CageStudioApp', ['ngRoute', 'firebase'])
	.run([function() {
		$.AMUI.progress.configure({
			showSpinner: false
		});
	}])
	.config(['$routeProvider', function($routeProvider) {
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