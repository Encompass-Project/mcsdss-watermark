(function() {
	'use strict';

	//Setting up route
	angular
		.module('publications')
		.config(PublicationsRoutes);

	PublicationsRoutes.$inject = ['$stateProvider'];

	function PublicationsRoutes($stateProvider) {
		// Publications state routing
		$stateProvider.
		state('listPublications', {
			url: '/publications',
			templateUrl: 'modules/publications/views/list-publications.client.view.html'
		}).
		state('createPublication', {
			url: '/publications/create',
			templateUrl: 'modules/publications/views/create-publication.client.view.html'
		}).
		state('viewPublication', {
			url: '/publications/:publicationId',
			templateUrl: 'modules/publications/views/view-publication.client.view.html'
		}).
		state('editPublication', {
			url: '/publications/:publicationId/edit',
			templateUrl: 'modules/publications/views/edit-publication.client.view.html'
		});
	}
})();