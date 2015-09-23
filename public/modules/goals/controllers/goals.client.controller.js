'use strict';

// Goals controller
angular.module('goals').controller('GoalsController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Goals',
	function($scope, $state, $stateParams, $location, Authentication, Goals) {
		$scope.authentication = Authentication;
		$scope.textLimitListView = 140;

		// Create new Goal
		$scope.create = function() {
			// Create new Goal object
			var goal = new Goals ({
				name: this.name,
				description: this.description,
				assumptions: this.assumptions,
				objectives: this.objectives,
				constraints: this.constraints,
				measures: this.measures,
				datasets: this.datasets,
				models: this.models,
				notebooks: this.notebooks,
				publications: this.publications,
				collaborators: this.collaborators,
				updated: this.updated
			});

			// console.log(goal);

			// Redirect after save
			goal.$save(function(response) {
				$location.path('goals/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.description = '';
				$scope.assumptions = '';
				$scope.objectives = '';
				$scope.constraints = '';
				$scope.measures = '';
				$scope.datasets = '';
				$scope.models = '';
				$scope.notebooks = '';
				$scope.publications = '';
				$scope.collaborators = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Goal
		$scope.remove = function(goal) {
			if ( goal ) {
				goal.$remove();

				for (var i in $scope.goals) {
					if ($scope.goals [i] === goal) {
						$scope.goals.splice(i, 1);
					}
				}
			} else {
				$scope.goal.$remove(function() {
					// $location.path('goals');
					$state.go('dashboard.goals', {}, {reload: true});
				});
			}
		};

		// Update existing Goal
		$scope.update = function() {
			var goal = $scope.goal;

			goal.$update(function() {
				$location.path('goals/' + goal._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Goals
		$scope.find = function() {
			$scope.goals = Goals.query();
		};

		// Find existing Goal
		$scope.findOne = function() {
			$scope.goal = Goals.get({
				goalId: $stateParams.goalId
			});
		};
	}
]);