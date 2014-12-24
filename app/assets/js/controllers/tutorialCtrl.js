angular.module('tutorialCtrl', [])
	.controller('tutorialListController', function($scope, $http, $state, Tutorial) {
		
		$scope.tutorialData = {};

		$scope.loading = true;

		Tutorial.get()
			.success(function(data) {
				$scope.tutorials = data;
				$scope.loading = false;
			});

		$scope.newTutorialForm = function() {
			$scope.showForm = !$scope.showForm;
		}

		$scope.submitTutorial = function() {
			$scope.loading = true;

			Tutorial.save($scope.tutorialData)
				.success(function(data) {
					Tutorial.get()
						.success(function(getData) {
							$scope.tutorials = getData;
							$scope.loading = false;
							$scope.tutorialData = {};
						})
				})
				.error(function(data) {
					console.log(data);
				});
		};

		$scope.deleteTutorial = function(id) {
			$scope.loading = true;

			Tutorial.destroy(id)
				.success(function(data) {
					Tutorial.get()
						.success(function(getData) {
							$scope.tutorials = getData;
							$scope.loading = false;
						});
				});
		}
	})
	.controller('tutorialDetailController', function($scope, $sce, $http, $state, Tutorial) {
		$scope.tutorialData = {};

		$scope.loading = true;

		Tutorial.show($state.params.tutorialId)
			.success(function(data) {
				$scope.tutorialData = data;
				$scope.htmlContent = $sce.trustAsHtml(data.content);
				$scope.loading = false;
			});
	});