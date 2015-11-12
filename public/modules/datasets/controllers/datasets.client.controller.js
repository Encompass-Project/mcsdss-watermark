(function() {
  'use strict';

  // Datasets controller
  angular
    .module('datasets')
    .controller('DatasetsController', DatasetsController);

  DatasetsController.$inject = ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Datasets', 'FileUploader']; /* '$upload', 'multipartForm', */

	function DatasetsController($scope, $state, $stateParams, $location, Authentication, Datasets, FileUploader) { /* $upload, multipartForm, */
		$scope.authentication = Authentication;
    $scope.currentRoute = 'Datasets';
		$scope.currentUser = Authentication.user;
    $scope.create = create;
    $scope.remove = remove;
    $scope.update = update;
    $scope.find = find;
    $scope.findOne = findOne;
    $scope.whatfiles = whatfiles;
    $scope.newDataset = {};

    console.log($scope.currentRoute);

		// Create new Dataset
		function create() {
			// Create new Dataset object
			var dataset = new Datasets ({
				name: this.name
			})

			// Redirect after save
			dataset.$save(function(response) {
				// $location.path('datasets/' + response._id);
				// $location.path('datasets');
				$state.go('datasets', {}, {reload: true});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Dataset
		function remove(dataset) {
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
					$state.go('datasets', {}, {reload: true});
				});
			}
		}

		// Update existing Dataset
		function update() {
			var dataset = $scope.dataset;

			dataset.$update(function() {
				// $location.path('datasets/' + dataset._id);
				$state.go('datasets.list', {}, {reload: true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Find a list of Datasets
		// $scope.find = function() {
		// 	$scope.datasets = Datasets.query();
		// };

		// Find a list of Datasets belonging to the current user.
		function find(user) {
			Datasets.query(function(datasets) {
				$scope.datasets = user ? datasets.filter(function(dataset) {
					return dataset.user._id === user._id;
				}) : datasets;
			});
		}

		// Find existing Dataset
		function findOne() {
			$scope.dataset = Datasets.get({
				datasetId: $stateParams.datasetId
			});
		}


    /* START UPLOAD TESTS */

    // SIMPLE TEST - UPLOADS.

    // $scope.Submit = function() {
    //     var uploadUrl = '/uploads';
    //     multipartForm.post(uploadUrl, $scope.newDataset);
    // };

		// MORE MULTIPART TESTS - METHOD 1: ng-file-upload.js

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

  		// COMPLEX TESTS - METHOD 3: angular-file-upload.js

    // Trace file data out.
    function whatfiles(uploader) {
      // console.log(uploader);
      console.log(uploader.queue);
    }

		// $scope.uploader = new FileUploader();
		var uploader = $scope.uploader = new FileUploader({
          // url: './uploads.php'
          url: '/uploads'
      });

    // FILTERS
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    // console.info('uploader', uploader);
	}
})();