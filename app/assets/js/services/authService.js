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