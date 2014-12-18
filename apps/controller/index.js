"use strict"

var cagestudio = angular.module('CageStudioApp', ['ngRoute']);

cagestudio.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
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

cagestudio.controller('IndexController', ['$scope','$location', function($scope,$location) {

	$scope.jump = function($event){
		if ($event) $event.preventDefault();
		$location.path($event.target.getAttribute('href'));
	}

}])
.controller('NewsController',[function(){

}])
.controller('MusicController',[function(){

}])