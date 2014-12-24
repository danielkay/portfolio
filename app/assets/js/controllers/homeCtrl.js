angular.module('homeCtrl', [])
	.controller('homeController', function($scope, $http, $state, Latest) {
		
		$scope.posts = {};
		$scope.projects = {};
		$scope.tutorials = {};

		$scope.loading = true;

		Latest.get()
			.success(function(data) {
				$scope.posts = data.posts;
				$scope.projects = data.projects;
				$scope.tutorials = data.tutorials;

				$scope.loading = false;
			});
	});