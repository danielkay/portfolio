angular.module('blogCtrl', [])
	.controller('blogController', function($rootScope, $scope, $http, Blog) {

        $scope.blogData = {};

        $scope.loading = true;

        Blog.get()
            .success(function(data) {
                $scope.posts = data;
                $scope.loading = false;
            });

        $scope.submitPost = function() {
            $scope.loading = true;

            Blog.save($scope.blogData)
                .success(function(data) {
                    Blog.get()
                        .success(function(getData) {
                            $scope.posts = getData;
                            $scope.loading = false;
                            $scope.blogData = {};
                        })
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        $scope.deletePost = function(id) {
            $scope.loading = true;

            Blog.destroy(id)
                .success(function(data) {
                    Blog.get()
                        .success(function(getData) {
                            $scope.posts = getData;
                            $scope.loading = false;
                        });
                });
        }

	});