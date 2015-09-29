'use strict';

// Datasets controller
angular.module('datasets').controller('DatasetsController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Datasets', 'FileUploader',
	function($scope, $state, $stateParams, $location, Authentication, Datasets, FileUploader) {
		$scope.authentication = Authentication;
		$scope.currentUser = Authentication.user;

		$scope.uploader = new FileUploader();

		// Create new Dataset
		$scope.create = function() {
			// Create new Dataset object
			var dataset = new Datasets ({
				name: this.name
			});

			// Redirect after save
			dataset.$save(function(response) {
				// $location.path('datasets/' + response._id);
				// $location.path('datasets');
				$state.go('dashboard.datasets', {}, {reload: true});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Dataset
		$scope.remove = function(dataset) {
			if ( dataset ) {
				dataset.$remove();

				for (var i in $scope.datasets) {
					if ($scope.datasets [i] === dataset) {
						$scope.datasets.splice(i, 1);
					}
				}
			} else {
				$scope.dataset.$remove(function() {
					// $location.path('datasets');
					$state.go('dashboard.datasets', {}, {reload: true});
				});
			}
		};

		// Update existing Dataset
		$scope.update = function() {
			var dataset = $scope.dataset;

			dataset.$update(function() {
				// $location.path('datasets/' + dataset._id);
				$state.go('dashboard.datasets.list', {}, {reload: true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Datasets
		// $scope.find = function() {
		// 	$scope.datasets = Datasets.query();
		// };

		// Find a list of Datasets belonging to the current user.
		$scope.find = function(user) {
			Datasets.query(function(datasets) {
				$scope.datasets = user ? datasets.filter(function(dataset) {
					return dataset.user._id === user._id;
				}) : datasets;
			});
		};

		// Find existing Dataset
		$scope.findOne = function() {
			$scope.dataset = Datasets.get({
				datasetId: $stateParams.datasetId
			});
		};

		// Trace file data out.
		$scope.whatfiles = function(uploader) {
			var targets = uploader;
			console.log(targets);
			// for (target in targets) {
			// 	console.log(target);
			// 	console.log('--------------');
			// }
		};
	}
]);