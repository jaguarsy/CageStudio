angular.module('CageStudioApp')
	.factory('cagelib', ['$http', function($http) {

		var x2js = new X2JS();
		var isfun = function(callback) {
			return typeof callback == 'function';
		}

		return {

			getFeed: function(url, callback) {
				if (!url) return;
				$http.get(url).success(
					function(data, status, headers, config) {
						isfun(callback) && callback(x2js.xml_str2json(data).rss);
					}
				).error(
					function(data, status, headers, config) {}
				);
			},
			isArray: function(v) {
				return toString.apply(v) === '[object Array]';
			},
			toArray: function(obj) {
				if (this.isArray(obj)) return obj;
				return [obj];
			}
		}

	}])
	.factory('routeManage', ['$location', function($location) {

		return {
			jump: function($event) {
				if ($event) $event.preventDefault();
				$location.path($event.target.getAttribute('href'));
			},
			isActive: function(route) {
				if (route == "/news" && $location.path() == "/") return true;
				return route === $location.path();
			}
		}

	}])
	.factory('winManage', [function() {

		var gui = require('nw.gui'),
			win = gui.Window.get(),
			isMaximized = false;

		return {
			close: function() {
				win.close();
			},
			minimize: function() {
				win.minimize();
			},
			maximize: function() {
				if (isMaximized) {
					isMaximized = false;
					win.unmaximize();
				} else {
					isMaximized = true;
					win.maximize();
				}
			}

		}

	}])
	.factory('fireManage', ['$firebase', function($firebase) {
		var ref = new Firebase("https://bitcage.firebaseio.com/feeds"),
			sync = $firebase(ref);

		return {
			getArray: function() {
				return sync.$asArray();
			}
		}
	}])