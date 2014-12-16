angular.module('projectService', [])
	.factory('Project', function($http) {
		return {
			get : function() {
				return $http.get('/api/project');
			},
			show : function(id) {
				return $http.get('/api/project/' + id);
			},
			save : function(projectData) {
				return $http({
					method: 'POST',
					url: '/api/project',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(projectData)
				});
			},
			destroy : function(id) {
				return $http.delete('/api/project/' + id);
			}
		}
	});