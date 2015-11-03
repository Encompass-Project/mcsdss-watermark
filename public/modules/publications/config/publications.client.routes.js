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
		})
		// PUBLICATIONS
    .state('dashboard.publications', {
      abstract: false,
      url: '/publications',
      templateUrl: 'modules/core/views/publications/publications.client.view.html',
      controller: 'PublicationsViewController'
    })
    .state('dashboard.publications.list', {
      abstract: false,
      url: '/list', // can also use- url: '/', but that has no semantic meaning.
      templateUrl: 'modules/publications/views/list-publications.client.view.html',
      controller: 'PublicationsController'
    })
    .state('dashboard.publications.list.details', {
      abstract: false,
      url: '/details/:publicationId',
      templateUrl: 'modules/publications/views/view-publication.client.view.html',
      controller: 'PublicationsController'
    })
    .state('dashboard.publications.list.edit', {
      abstract: false,
      url: '/edit/:publicationId',
      templateUrl: 'modules/publications/views/edit-publication.client.view.html',
      controller: 'PublicationsController'
    })
    .state('dashboard.publications.load', {
      abstract: false,
      url: '/load',
      templateUrl: 'modules/publications/views/create-publication.client.view.html',
      controller: 'PublicationsController'
    })
    .state('dashboard.publications.curate', {
      abstract: false,
      url: '/curate',
      templateUrl: 'modules/core/views/publications/publications.curate.client.view.html',
      controller: 'PublicationsCurateViewController'
    })
    .state('dashboard.publications.publish', {
      abstract: false,
      url: '/publish',
      templateUrl: 'modules/core/views/publications/publications.publish.client.view.html',
      controller: 'PublicationsPublishViewController'
    });
	}
})();