angular.module('projectCtrl', [])
	.controller('projectListController', function($scope, $http, $state, Project) {
		
		$scope.projectData = {};

		$scope.loading = true;

		Project.get()
			.success(function(data) {
				$scope.projects = data;
				$scope.loading = false;
			});

		$scope.submitProject = function() {
			$scope.loading = true;

			Project.save($scope.projectData)
				.success(function(data) {
					Project.get()
						.success(function(getData) {
							$scope.projects = getData;
							$scope.loading = false;
							$scope.projectData = {};
						})
				})
				.error(function(data) {
					console.log(data);
				});
		};

		$scope.deleteProject = function(id) {
			$scope.loading = true;

			Project.destroy(id)
				.success(function(data) {
					Project.get()
						.success(function(getData) {
							$scope.projects = getData;
							$scope.loading = false;
						});
				});
		}
	})
	.controller('projectDetailController', function($scope, $http, Project) {
		$scope.projectData = {};

		$scope.loading = true;

		Project.show(id)
			.success(function(data) {
				$scope.projectData = data;
				$scope.loading = false;
			});

		$scope.deleteProject = function(id) {
			$scope.loading = true;

			Project.destroy(id)
				.success(function(data) {
					$location.path( "/projects" );
				});
		}
	});