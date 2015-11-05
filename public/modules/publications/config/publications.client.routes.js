(function() {
	'use strict';

	angular
		.module('publications')
		.config(PublicationsRoutes);

	PublicationsRoutes.$inject = ['$stateProvider'];

	function PublicationsRoutes($stateProvider) {
		$stateProvider
      .state('publications', {
        abstract: false,
        url: '/publications',
        templateUrl: 'modules/publications/views/publications.client.view.html',
        controller: 'PublicationsViewController'
      })
      .state('publications.list', {
        abstract: false,
        url: '/list',
        templateUrl: 'modules/publications/views/list-publications.client.view.html',
        controller: 'PublicationsController'
      })
      .state('publications.list.details', {
        abstract: false,
        url: '/details/:publicationId',
        templateUrl: 'modules/publications/views/view-publication.client.view.html',
        controller: 'PublicationsController'
      })
      .state('publications.list.edit', {
        abstract: false,
        url: '/edit/:publicationId',
        templateUrl: 'modules/publications/views/edit-publication.client.view.html',
        controller: 'PublicationsController'
      })
      .state('publications.list.load', {
        abstract: false,
        url: '/load',
        templateUrl: 'modules/publications/views/create-publication.client.view.html',
        controller: 'PublicationsController'
      })
      .state('publications.list.curate', {
        abstract: false,
        url: '/curate',
        templateUrl: 'modules/publications/views/publications.curate.client.view.html',
        controller: 'PublicationsCurateViewController'
      })
      .state('publications.list.publish', {
        abstract: false,
        url: '/publish',
        templateUrl: 'modules/publications/views/publications.publish.client.view.html',
        controller: 'PublicationsPublishViewController'
      });
	}
})();