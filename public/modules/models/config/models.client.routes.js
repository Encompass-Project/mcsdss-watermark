(function() {
	'use strict';

	angular
		.module('models')
		.config(ModelsRoutes);

	ModelsRoutes.$inject =['$stateProvider'];

	function ModelsRoutes($stateProvider) {
		$stateProvider
      .state('models', {
        abstract: false,
        url: '/models',
        templateUrl: 'modules/models/views/models.client.view.html',
        controller: 'ModelsViewController'
      })
      .state('models.list', {
        abstract: false,
        url: '/list',
        templateUrl: 'modules/models/views/list-models.client.view.html',
        controller: 'ModelsController'
      })
      .state('models.list.details', {
        abstract: false,
        url: '/details/:modelId',
        templateUrl: 'modules/models/views/view-model.client.view.html',
        controller: 'ModelsController'
      })
      .state('models.list.edit', {
        abstract: false,
        url: '/edit/:modelId',
        templateUrl: 'modules/models/views/edit-model.client.view.html',
        controller: 'ModelsController'
      })
      .state('models.list.load', {
        abstract: false,
        url: '/load',
        templateUrl: 'modules/models/views/create-model.client.view.html',
        controller: 'ModelsController'
      })
      .state('models.list.curate', {
        abstract: false,
        url: '/load',
        templateUrl: 'modules/models/views/models.curate.client.view.html',
        controller: 'ModelsCurateViewController'
      })
      .state('models.list.publish', {
        abstract: false,
        url: '/load',
        templateUrl: 'modules/models/views/models.publish.client.view.html',
        controller: 'ModelsPublishViewController'
      });
	}
})();