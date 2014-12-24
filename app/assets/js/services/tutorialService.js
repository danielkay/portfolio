angular.module('tutorialService', [])
	.factory('Tutorial', function($http) {
		return {
			get : function() {
				return $http.get('/api/tutorial');
			},
			show : function(id) {
				return $http.get('/api/tutorial/' + id);
			},
			save : function(tutorialData) {
				return $http({
					method: 'POST',
					url: '/api/tutorial',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(tutorialData)
				});
			},
			destroy : function(id) {
				return $http.delete('/api/tutorial/' + id);
			}
		}
	});