angular.module('latestService', [])
	.factory('Latest', function($http) {
		return {
			get : function() {
				return $http.get('/api/latest');
			},
			show : function(categpry) {
				return $http.get('/api/project/' + category);
			}
		}
	});