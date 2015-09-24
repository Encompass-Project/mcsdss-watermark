'use strict';

// Formulations controller
angular.module('formulations').controller('FormulationsController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Formulations',
	function($scope, $state, $stateParams, $location, Authentication, Formulations) {
		$scope.authentication = Authentication;

		// Create new Formulation
		$scope.create = function() {
			// Create new Formulation object
			var formulation = new Formulations ({
				name: this.name
			});

			// Redirect after save
			formulation.$save(function(response) {
				// $location.path('formulations/' + response._id);
				$state.go('dashboard.formulations', {}, {reload: true});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Formulation
		$scope.remove = function(formulation) {
			if ( formulation ) {
				formulation.$remove();

				for (var i in $scope.formulations) {
					if ($scope.formulations [i] === formulation) {
						$scope.formulations.splice(i, 1);
					}
				}
			} else {
				$scope.formulation.$remove(function() {
					// $location.path('formulations');
					$state.go('dashboard.formulations', {}, {reload: true});
				});
			}
		};

		// Update existing Formulation
		$scope.update = function() {
			var formulation = $scope.formulation;

			formulation.$update(function() {
				// $location.path('formulations/' + formulation._id);
				$state.go('dashboard.formulations.list', {}, {reload: true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Formulations
		$scope.find = function() {
			$scope.formulations = Formulations.query();
		};

		// Find existing Formulation
		$scope.findOne = function() {
			$scope.formulation = Formulations.get({
				formulationId: $stateParams.formulationId
			});
		};
	}
]);