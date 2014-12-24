angular.module('projectCtrl', [])
	.controller('projectListController', function($scope, $http, $state, Project) {
		
		$scope.projectData = {};

		$scope.loading = true;

		Project.get()
			.success(function(data) {
				$scope.projects = data;
				$scope.loading = false;
			});

		$scope.newProjectForm = function() {
			$scope.showForm = !$scope.showForm;
		}

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
	.controller('projectDetailController', function($scope, $sce, $http, $state, Project) {
		$scope.projectData = {};

		$scope.loading = true;

		Project.show($state.params.projectId)
			.success(function(data) {
				$scope.projectData = data;
				$scope.htmlContent = $sce.trustAsHtml(data.description);
				$scope.loading = false;
			});
	});