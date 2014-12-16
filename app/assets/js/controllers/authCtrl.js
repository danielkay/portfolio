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