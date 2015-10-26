(function() {
	'use strict';

	angular
		.module('users')
		.controller('SettingsController', SettingsController);

	SettingsController.$inject = ['$scope', '$http', '$location', 'Users', 'Authentication'];

	function SettingsController($scope, $http, $location, Users, Authentication) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
		$scope.hasConnectedAdditionalSocialAccounts = hasConnectedAdditionalSocialAccounts;
		$scope.isConnectedSocialAccount = isConnectedSocialAccount;
		$scope.removeUserSocialAccount = removeUserSocialAccount;
		$scope.updateUserProfile = updateUserProfile;
		$scope.changeUserPassword = changeUserPassword;
		// console.log(Authentication);

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts
		function hasConnectedAdditionalSocialAccounts(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		}

		// Check if provider is already in use with current user
		function isConnectedSocialAccount(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		}

		// Remove a user social account
		function removeUserSocialAccount(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		}

		// Update a user profile
		function updateUserProfile(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		}

		// Change user password
		function changeUserPassword() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		}
	}

})();