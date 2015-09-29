'use strict';

// Datasets controller
angular.module('datasets').controller('DatasetsController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Datasets', /*'$upload',*/  'FileUploader',
	function($scope, $state, $stateParams, $location, Authentication, Datasets, /*$upload,*/ FileUploader ) {
		$scope.authentication = Authentication;
		$scope.currentUser = Authentication.user;

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

		// METHOD 1: ng-file-upload.js
		// $upload.upload({
  //           url: '/serverRouteUrl', //upload.php script, node.js route, etc..
  //           method: 'POST', //Post or Put
  //           headers: {'Content-Type': 'multipart/form-data'},
  //           //withCredentials: true,
  //           data: JsonObject, //from data to send along with the file
  //           file: blob, // or list of files ($files) for html5 only
  //           //fileName: 'photo' // to modify the name of the file(s)
  //       }).success(function (response, status) {
  //              //success
  //           }
  //       ).error(function (err) {
  //              //error
  //           }
  //       );

  		// METHOD 2: angular-file-upload.js
  		$scope.uploader = new FileUploader();
		// Trace file data out.
		$scope.whatfiles = function(uploader) {
			// console.log(uploader);
			console.log(uploader.queue);
		};
	}
]);