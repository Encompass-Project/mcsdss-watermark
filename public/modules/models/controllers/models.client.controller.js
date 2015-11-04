(function() {
	'use strict';

	// Models controller
	angular
		.module('models')
		.controller('ModelsController', ModelsController);

	ModelsController.$inject = ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Models'];

	function ModelsController($scope, $state, $stateParams, $location, Authentication, Models) {
		$scope.authentication = Authentication;
		$scope.currentUser = Authentication.user;
		$scope.create = create;
		$scope.remove = remove;
		$scope.update = update;
		$scope.find = find;
		$scope.findOne = findOne;

		// Create new Model
		function create() {
			// Create new Model object
			var model = new Models ({
				name: this.name
			});

			// Redirect after save
			model.$save(function(response) {
				// $location.path('models/' + response._id);
				$state.go('models', {}, {reload: true});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Remove existing Model
		function remove(model) {
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
					$state.go('models', {}, {reload: true});
				});
			}
		}

		// Update existing Model
		function update() {
			var model = $scope.model;

			model.$update(function() {
				// $location.path('models/' + model._id);
				$state.go('models.list', {}, {reload: true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Find a list of Formulations belonging to the current user.
		function find(user) {
			Models.query(function(models) {
				$scope.models = user ? models.filter(function(model) {
					return model.user._id === user._id;
				}) : models;
			});
		}

		// Find existing Model
		function findOne() {
			$scope.model = Models.get({
				modelId: $stateParams.modelId
			});
		}
	}
})();