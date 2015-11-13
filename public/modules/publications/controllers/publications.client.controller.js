(function() {
	'use strict';

	// Publications controller
	angular
		.module('publications')
		.controller('PublicationsController', PublicationsController);

	PublicationsController.$inject = ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Publications'];

	function PublicationsController($scope, $state, $stateParams, $location, Authentication, Publications) {
		$scope.authentication = Authentication;
		$scope.currentRoute = 'Publications';
		$scope.currentUser = Authentication.user;
		$scope.create = create;
		$scope.remove = remove;
		$scope.update = update;
		$scope.find = find;
		$scope.findOne = findOne;

		console.log($scope.currentRoute);

		// Create new Publication
		function create() {
			// Create new Publication object
			var publication = new Publications ({
				name: this.name
			});

			// Redirect after save
			publication.$save(function(response) {
				// $location.path('publications/' + response._id);
				$state.go('publications', {}, {reload: true});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Remove existing Publication
		function remove(publication) {
			if ( publication ) {
				publication.$remove();

				for (var i in $scope.publications) {
					if ($scope.publications [i] === publication) {
						$scope.publications.splice(i, 1);
					}
				}
			} else {
				$scope.publication.$remove(function() {
					// $location.path('publications');
					$state.go('publications', {}, {reload: true});
				});
			}
		}

		// Update existing Publication
		function update() {
			var publication = $scope.publication;

			publication.$update(function() {
				// $location.path('publications/' + publication._id);
				$state.go('publications.list', {}, {reload: true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Find a list of Publications
		// $scope.find = function() {
		// 	$scope.publications = Publications.query();
		// };

		// Find a list of Formulations belonging to the current user.
		function find(user) {
			Publications.query(function(publications) {
				$scope.publications = user ? publications.filter(function(publication) {
					return publication.user._id === user._id;
				}) : publications;
			});
		}

		// Find existing Publication
		function findOne() {
			$scope.publication = Publications.get({
				publicationId: $stateParams.publicationId
			});
		}
	}
})();