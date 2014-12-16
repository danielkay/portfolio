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