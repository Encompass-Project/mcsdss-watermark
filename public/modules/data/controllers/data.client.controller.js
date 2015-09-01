'use strict';

// Data controller
angular.module('data').controller('DataController', ['$scope', '$stateParams', '$location', 'Authentication', 'Data',
	function($scope, $stateParams, $location, Authentication, Data) {
		$scope.authentication = Authentication;

		// Create new Datum
		$scope.create = function() {
			// Create new Datum object
			var datum = new Data ({
				name: this.name
			});

			// Redirect after save
			datum.$save(function(response) {
				$location.path('data/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Datum
		$scope.remove = function(datum) {
			if ( datum ) { 
				datum.$remove();

				for (var i in $scope.data) {
					if ($scope.data [i] === datum) {
						$scope.data.splice(i, 1);
					}
				}
			} else {
				$scope.datum.$remove(function() {
					$location.path('data');
				});
			}
		};

		// Update existing Datum
		$scope.update = function() {
			var datum = $scope.datum;

			datum.$update(function() {
				$location.path('data/' + datum._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Data
		$scope.find = function() {
			$scope.data = Data.query();
		};

		// Find existing Datum
		$scope.findOne = function() {
			$scope.datum = Data.get({ 
				datumId: $stateParams.datumId
			});
		};
	}
]);