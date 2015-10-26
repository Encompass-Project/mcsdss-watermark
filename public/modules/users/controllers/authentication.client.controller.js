(function() {
	'use strict';

	angular
		.module('users')
		.controller('AuthenticationController', AuthenticationController);

	AuthenticationController.$inject = ['$scope', '$http', '$location', 'Authentication'];

	function AuthenticationController($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		$scope.signup = signup;
		$scope.signin = signin;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		function signup() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		}

		function signin() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		}
	}

})();