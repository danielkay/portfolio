angular.module('blogService', [])
	.factory('Blog', function($http) {
		return {
			get : function() {
				return $http.get('/api/blog');
			},
			show : function(id) {
				return $http.get('/api/blog/' + id);
			},
			save : function(blogData) {
				return $http({
					method: 'POST',
					url: '/api/blog',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(blogData)
				});
			},
			destroy : function(id) {
				return $http.delete('/api/blog/' + id);
			}
		}
	});