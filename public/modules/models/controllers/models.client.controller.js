'use strict';

// Models controller
angular.module('models').controller('ModelsController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Models',
	function($scope, $state, $stateParams, $location, Authentication, Models) {
		$scope.authentication = Authentication;
		$scope.currentUser = Authentication.user;

		// Create new Model
		$scope.create = function() {
			// Create new Model object
			var model = new Models ({
				name: this.name
			});

			// Redirect after save
			model.$save(function(response) {
				// $location.path('models/' + response._id);
				$state.go('dashboard.models', {}, {reload: true});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Model
		$scope.remove = function(model) {
			if ( model ) {
				model.$remove();

				for (var i in $scope.models) {
					if ($scope.models [i] === model) {
						$scope.models.splice(i, 1);
					}
				}
			} else {
				$scope.model.$remove(function() {
					// $location.path('models');
					$state.go('dashboard.models', {}, {reload: true});
				});
			}
		};

		// Update existing Model
		$scope.update = function() {
			var model = $scope.model;

			model.$update(function() {
				// $location.path('models/' + model._id);
				$state.go('dashboard.models.list', {}, {reload: true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Models
		// $scope.find = function() {
		// 	$scope.models = Models.query();
		// };

		// Find a list of Formulations belonging to the current user.
		$scope.find = function(user) {
			Models.query(function(models) {
				$scope.models = user ? models.filter(function(model) {
					return model.user._id === user._id;
				}) : models;
			});
		};

		// Find existing Model
		$scope.findOne = function() {
			$scope.model = Models.get({
				modelId: $stateParams.modelId
			});
		};
	}
]);