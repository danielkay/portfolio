var portfolioApp = angular.module('portfolioApp', ['mainCtrl','blogCtrl','homeCtrl','authCtrl','projectCtrl','mainDirectives','projectDirectives','authService','blogService','projectService','sessionService', 'ui.bootstrap.dropdown','ui.router','ngMd5','ngResource','ngSanitize'])
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
    }).run(function ($rootScope, Session) {
		function init() {
			if (Session.get("auth")) {
				$rootScope.currentUser = {};
				$rootScope.currentUser.id = Session.get("userId");
				$rootScope.currentUser.name = Session.get("userName");
				$rootScope.currentUser.email = Session.get("userEmail");
			}
		}
		 
		init();
    });
 //    .run(function ($rootScope, AUTH_EVENTS, Authenticate) {
	// 	$rootScope.$on('$stateChangeStart', function (event, next) {
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