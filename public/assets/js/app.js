var portfolioApp = angular.module('portfolioApp',
	['mainCtrl','blogCtrl','homeCtrl','authCtrl','projectCtrl','mainDirectives',
	'projectDirectives','authService','blogService','projectService',
	'ui.bootstrap.dropdown','ui.router','ngMd5','ngResource','ngSanitize'])
	.config(function($httpProvider) {
        var interceptor = ['$location', '$q', '$injector', function($location, $q, $injector) {
		    function success(response) {
		        return response;
		    }

		    function error(response) {
		        if(response.status === 401) {
		            $injector.get('$state').transitionTo('login');
                	delete sessionStorage.authenticated
		            return $q.reject(response);
		        }
		        else {
		            return $q.reject(response);
		        }
		    }

		    return function(promise) {
		        return promise.then(success, error);
		    }
		}];

		$httpProvider.interceptors.push(interceptor);

		$httpProvider.interceptors.push(['$injector',
			function ($injector) {
				return $injector.get('AuthInterceptor');
			}
		]);
    });
 //    .run(function ($rootScope, AUTH_EVENTS, Authenticate) {
	// 	$rootScope.$on('$stateChangeStart', function (event, next) {
	// 		console.log(next);
	// 		var authorizedRoles = next.data.authorizedRoles;
	// 		if (!Authenticate.isAuthorized(authorizedRoles)) {
	// 			event.preventDefault();
	// 			if (Authenticate.isAuthenticated()) {
	// 				// user is not allowed
	// 				$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
	// 			} else {
	// 				// user is not logged in
	// 				$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	// 			}
	// 		}
	// 	});
	// });
angular.module('authCtrl', [])
    .controller('loginController', function ($window, $scope, $rootScope, $state, AUTH_EVENTS, Authenticate, Session) {
        $scope.credentials = {
            email: '',
            password: ''
        };
        $scope.login = function(credentials) {
            Authenticate.login(credentials).then(function(user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $rootScope.setCurrentUser(user);
                $state.go('dashboard');
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
    })
    .controller('logoutController', function($scope, $rootScope, $state, AUTH_EVENTS, Authenticate, Session) {
        Session.destroy();
        $rootScope.currentUser = null;
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        $state.go('home');
    })
    .controller('dashboardController', function($scope) {
        // ...
    })
	.controller('registerController', function($scope, $http) {
		// ...
	});
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
angular.module('homeCtrl', [])
	.controller('homeController', function($scope, $http, $state) {
		
	});
angular.module('mainCtrl', [])
	.controller('mainController', function($rootScope, $scope, $http, $state, USER_ROLES, Authenticate) {
		$scope.userRoles = USER_ROLES;
		$scope.isAuthorized = Authenticate.isAuthorized;

		$rootScope.setCurrentUser = function (user) {
			$rootScope.currentUser = user;
		};

        $rootScope.clearCurrentUser = function () {
            $rootScope.currentUser = null;
        };

		$rootScope.gFormat = function (email) {
			return md5(strtolower(trim(email)));
		};
	})
    .controller('menuController', function($scope) {
        
    })
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    });
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
angular.module('mainDirectives', [])
	.directive('skrollr-init', function($scope) {
		return {
			restrict: 'A',
			scope: true,
			link: function() {
				skrollr.init();
				$scope.$apply();
				// skrollr.get().refresh();
			}
		};
	})
/**
 * A directive to embed a Disqus comments widget on your AngularJS page.
 *
 * For documentation, see the README.md file in this directory
 *
 * Created by Michael on 22/01/14.
 * Copyright Michael Bromley 2014
 * Available under the MIT license.
 */
	.directive('dirDisqus', ['$window', function($window) {
        return {
            restrict: 'A',
            scope: {
                disqus_shortname: '@disqusShortname',
                disqus_identifier: '@disqusIdentifier',
                disqus_title: '@disqusTitle',
                disqus_url: '@disqusUrl',
                disqus_category_id: '@disqusCategoryId',
                disqus_disable_mobile: '@disqusDisableMobile',
                readyToBind: "@"
            },
            template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>',
            link: function(scope) {

                // ensure that the disqus_identifier and disqus_url are both set, otherwise we will run in to identifier conflicts when using URLs with "#" in them
                // see http://help.disqus.com/customer/portal/articles/662547-why-are-the-same-comments-showing-up-on-multiple-pages-
                if (typeof scope.disqus_identifier === 'undefined' || typeof scope.disqus_url === 'undefined') {
                    throw "Please ensure that the `disqus-identifier` and `disqus-url` attributes are both set.";
                }

                scope.$watch("readyToBind", function(isReady) {

                    // If the directive has been called without the 'ready-to-bind' attribute, we
                    // set the default to "true" so that Disqus will be loaded straight away.
                    if ( !angular.isDefined( isReady ) ) {
                        isReady = "true";
                    }
                    if (scope.$eval(isReady)) {
                        // put the config variables into separate global vars so that the Disqus script can see them
                        $window.disqus_shortname = scope.disqus_shortname;
                        $window.disqus_identifier = scope.disqus_identifier;
                        $window.disqus_title = scope.disqus_title;
                        $window.disqus_url = scope.disqus_url;
                        $window.disqus_category_id = scope.disqus_category_id;
                        $window.disqus_disable_mobile = scope.disqus_disable_mobile;

                        // get the remote Disqus script and insert it into the DOM, but only if it not already loaded (as that will cause warnings)
                        if (!$window.DISQUS) {
                            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                            dsq.src = '//' + scope.disqus_shortname + '.disqus.com/embed.js';
                            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                        } else {
                            $window.DISQUS.reset({
                                reload: true,
                                config: function () {
                                    this.page.identifier = scope.disqus_identifier;
                                    this.page.url = scope.disqus_url;
                                    this.page.title = scope.disqus_title;
                                }
                            });
                        }
                    }
                });
            }
        };
    }]);
angular.module('projectDirectives', [])
	.directive('project', function() {
		return {
			restrict: 'C',
			link: function() {
				
			}
		};
	});
portfolioApp
    .config(function($locationProvider, $stateProvider, USER_ROLES){
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('root', {
                abstract: true,
                templateUrl: 'views/layout.html'
            })
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                parent: 'root'
            })
            .state('blog', {
                url: '/blog',
                templateUrl: 'views/blog.html',
                controller: 'blogController',
                parent: 'root'
            })
            .state('blog.post', {
                url: '/blog/{postId}',
                templateUrl: 'views/blogPost.html',
                parent: 'blog'
            })
            .state('projects', {
                url: '/projects',
                templateUrl: '/views/projects.html',
                parent: 'root'
            })
            .state('projects.detail', {
                url: '/projects/{projectId}',
                templateUrl: '/views/projectDetail.html',
                parent: 'root'
            })
            .state('login', {
                url: '/auth/login',
                templateUrl: 'views/auth/login.html',
                controller: 'loginController',
                parent: 'root'
            })
            .state('logout', {
                url: '/auth/logout',
                controller: 'logoutController',
                parent: 'root'
            })
            .state('register', {
                url: '/auth/register',
                templateUrl: 'views/auth/register.html',
                controller: 'registerController',
                parent: 'root'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardController',
                parent: 'root'
            });
    });

angular.module('authService', [])
    .factory('Authenticate', function ($http, Session) {
		var authService = {};

		authService.login = function (credentials) {
			// return $http
			// 	.post('/service/authenticate/', credentials)
			// 	.then(function (res) {
			// 		Session.create(res.data.id, res.data.user.id, res.data.user.email, res.data.user.role);
			// 		return res.data.user;
			// 	});
			return $.ajax({
					type: 'POST',
					url: '/service/authenticate/',
					data: credentials,
					async: false,
					success: function(res) {
						Session.create(res.data.id, res.data.user.id, res.data.user.email, res.data.user.role);
						return res.data.user;
					}
				});
		};

		authService.isAuthenticated = function () {
			return !!Session.userId;
		};

		authService.isAuthorized = function (authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
		};

		return authService;
	})
	.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
		return {
			responseError: function (response) { 
				$rootScope.$broadcast({
					401: AUTH_EVENTS.notAuthenticated,
					403: AUTH_EVENTS.notAuthorized,
					419: AUTH_EVENTS.sessionTimeout,
					440: AUTH_EVENTS.sessionTimeout
				}[response.status], response);
				return $q.reject(response);
			}
		};
	})
	.service('Session', function ($window) {
		this.create = function (sessionId, userId, userEmail, userRole) {
			this.id = sessionId;
			this.userId = userId;
			this.userEmail = userEmail;
			this.userRole = userRole;
		};
		this.destroy = function () {
			this.id = null;
			this.userId = null;
			this.userEmail = null;
			this.userRole = null;
		};
		return this;
	});
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