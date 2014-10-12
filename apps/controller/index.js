var phonecatApp = angular.module('CageStudioApp', []);
phonecatApp.controller('IndexController', function($scope, $http, $sce) {
	$http.get('apps/views/music.html').success(function(data) {
		$scope.partail = data;
		$scope.partail = $sce.trustAsHtml($scope.partail);
	});
});