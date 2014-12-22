angular.module('CageStudioApp')
	.filter('dateFilter', function() {
		return function(dateSTR) {
			return Date.parse(dateSTR);
		}
	})
	.filter('unsafe', ['$sce', function($sce) {
		return function(val) {
			if (val == undefined) return "";
			if (val["__cdata"])
				return $sce.trustAsHtml(val["__cdata"]);
			else
				return $sce.trustAsHtml(val);
		};
	}])
	.filter('summary', [function() {
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