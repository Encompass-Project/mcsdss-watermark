'use strict';

// Geojsons controller
angular.module('geojsons').controller('GeojsonsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Geojsons',
	function($scope, $stateParams, $location, Authentication, Geojsons) {
		$scope.authentication = Authentication;

		// Create new Geojson
		$scope.create = function() {
			// Create new Geojson object
			var geojson = new Geojsons ({
				name: this.name,
				description: this.description
			});

			// Redirect after save
			geojson.$save(function(response) {
				$location.path('geojsons/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.description = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Geojson
		$scope.remove = function(geojson) {
			if ( geojson ) {
				geojson.$remove();

				for (var i in $scope.geojsons) {
					if ($scope.geojsons [i] === geojson) {
						$scope.geojsons.splice(i, 1);
					}
				}
			} else {
				$scope.geojson.$remove(function() {
					$location.path('geojsons');
				});
			}
		};

		// Update existing Geojson
		$scope.update = function() {
			var geojson = $scope.geojson;

			geojson.$update(function() {
				$location.path('geojsons/' + geojson._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Geojsons
		$scope.find = function() {
			$scope.geojsons = Geojsons.query();
		};

		// Find existing Geojson
		$scope.findOne = function() {
			$scope.geojson = Geojsons.get({
				geojsonId: $stateParams.geojsonId
			});
		};
	}
]);