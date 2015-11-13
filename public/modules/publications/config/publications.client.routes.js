(function() {
	'use strict';

	angular
		.module('publications')
		.config(PublicationsRoutes);

	PublicationsRoutes.$inject = ['$stateProvider'];

	function PublicationsRoutes($stateProvider) {

    // Define states.
    var publications_state = {
      abstract: false,
      url: '/publications',
      templateUrl: 'modules/publications/views/publications.client.view.html',
      controller: 'PublicationsViewController',
      controllerAs: 'publicationsView',
      data: {
        title: 'Publications'
      }
    };

    var publications_list_state = {
      abstract: false,
      url: '/list',
      templateUrl: 'modules/publications/views/list-publications.client.view.html',
      controller: 'PublicationsController',
      controllerAs: 'publications'
    };

    var publications_list_details_state = {
      abstract: false,
      url: '/details/:publicationId',
      templateUrl: 'modules/publications/views/view-publication.client.view.html',
      controller: 'PublicationsController',
      controllerAs: 'publications'
    };

    var publications_list_edit_state = {
      abstract: false,
      url: '/edit/:publicationId',
      templateUrl: 'modules/publications/views/edit-publication.client.view.html',
      controller: 'PublicationsController',
      controllerAs: 'publications'
    };

    var publications_list_load_state = {
      abstract: false,
      url: '/load',
      templateUrl: 'modules/publications/views/create-publication.client.view.html',
      controller: 'PublicationsController',
      controllerAs: 'publications'
    };

    var publications_list_curate_state = {
      abstract: false,
      url: '/curate',
      templateUrl: 'modules/publications/views/edit-publication.client.view.html', // '/publications.curate.client.view.html'
      controller: 'PublicationsController', //'PublicationsCurateViewController'
      controllerAs: 'publications' // 'publicationsCurate'
    };

    var publications_list_publish_state = {
      abstract: false,
      url: '/publish',
      templateUrl: 'modules/publications/views/publications.publish.client.view.html',
      controller: 'PublicationsPublishViewController',
      controllerAs: 'publicationsPublish'
    };

    // Populate provider.
		$stateProvider
      .state('publications', publications_state)
      .state('publications.list', publications_list_state)
      .state('publications.list.details', publications_list_details_state)
      .state('publications.list.edit', publications_list_edit_state)
      .state('publications.list.load', publications_list_load_state)
      .state('publications.list.curate', publications_list_curate_state)
      .state('publications.list.publish', publications_list_publish_state);
	}
})();