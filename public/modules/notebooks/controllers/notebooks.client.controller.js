(function() {
	'use strict';

	// Notebooks controller
	angular
		.module('notebooks')
		.controller('NotebooksController', NotebooksController);

	NotebooksController.$inject = ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Notebooks'];

	function NotebooksController($scope, $state, $stateParams, $location, Authentication, Notebooks) {
		$scope.authentication = Authentication;
		$scope.currentUser = Authentication.user;
		$scope.create = create;
		$scope.remove = remove;
		$scope.update = update;
		$scope.find = find;
		$scope.findOne = findOne;

		// Create new Notebook
		function create() {
			// Create new Notebook object
			var notebook = new Notebooks ({
				name: this.name
			});

			// Redirect after save
			notebook.$save(function(response) {
				// $location.path('notebooks/' + response._id);
				$state.go('dashboard.notebooks', {}, {reload: true});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Remove existing Notebook
		function remove(notebook) {
			if ( notebook ) {
				notebook.$remove();

				for (var i in $scope.notebooks) {
					if ($scope.notebooks [i] === notebook) {
						$scope.notebooks.splice(i, 1);
					}
				}
			} else {
				$scope.notebook.$remove(function() {
					// $location.path('notebooks');
					$state.go('dashboard.notebooks', {}, {reload: true});
				});
			}
		}

		// Update existing Notebook
		function update() {
			var notebook = $scope.notebook;

			notebook.$update(function() {
				// $location.path('notebooks/' + notebook._id);
				$state.go('dashboard.notebooks.list', {}, {reload: true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Find a list of Notebooks
		// $scope.find = function() {
		// 	$scope.notebooks = Notebooks.query();
		// };

		// Find a list of Formulations belonging to the current user.
		function find(user) {
			Notebooks.query(
				function(notebooks) {
					$scope.notebooks = user ? notebooks.filter(function(notebook) {
						return notebook.user._id === user._id;
					}) : notebooks;
				}
			);
		}

		// Find existing Notebook
		function findOne() {
			$scope.notebook = Notebooks.get({
				notebookId: $stateParams.notebookId
			});
		}
	}
})();