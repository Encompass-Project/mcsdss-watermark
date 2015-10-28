(function() {
	'use strict';

	// Decisions controller
	angular
		.module('decisions')
		.controller('DecisionsController', DecisionsController);

	DecisionsController.$inject = ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Decisions'];

	function DecisionsController($scope, $state, $stateParams, $location, Authentication, Decisions) {
		$scope.authentication = Authentication;
		$scope.currentUser = Authentication.user;
		$scope.create = create;
		$scope.remove = remove;
		$scope.update = update;
		$scope.find = find;
		$scope.findOne = findOne;

		// Create new Decision
		unction create() {
			// Create new Decision object
			var decision = new Decisions ({
				name: this.name
			});

			// Redirect after save
			decision.$save(function(response) {
				// $location.path('decisions/' + response._id);
				$state.go('dashboard.decisions', {}, {reload: true});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Remove existing Decision
		function remove(decision) {
			if ( decision ) {
				decision.$remove();

				for (var i in $scope.decisions) {
					if ($scope.decisions [i] === decision) {
						$scope.decisions.splice(i, 1);
					}
				}
			} else {
				$scope.decision.$remove(function() {
					// $location.path('decisions');
					$state.go('dashboard.decisions', {}, {reload: true});
				});
			}
		}

		// Update existing Decision
		function update() {
			var decision = $scope.decision;

			decision.$update(function() {
				// $location.path('decisions/' + decision._id);
				$state.go('dashboard.decisions.list', {}, {reload: true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Find a list of Decisions
		// $scope.find = function() {
		// 	$scope.decisions = Decisions.query();
		// };

		// Find a list of Formulations belonging to the current user.
		function find(user) {
			Decisions.query(function(decisions) {
				$scope.decisions = user ? decisions.filter(function(decision) {
					return decision.user._id === user._id;
				}) : decisions;
			});
		}

		// Find existing Decision
		function findOne() {
			$scope.decision = Decisions.get({
				decisionId: $stateParams.decisionId
			});
		}
	}
})();