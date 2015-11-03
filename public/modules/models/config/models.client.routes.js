(function() {
	'use strict';

	//Setting up route
	angular
		.module('models')
		.config(ModelsRoutes);

	ModelsRoutes.$inject =['$stateProvider'];

	function ModelsRoutes($stateProvider) {
		// Models state routing
		$stateProvider.
		state('listModels', {
			url: '/models',
			templateUrl: 'modules/models/views/list-models.client.view.html'
		}).
		state('createModel', {
			url: '/models/create',
			templateUrl: 'modules/models/views/create-model.client.view.html'
		}).
		state('viewModel', {
			url: '/models/:modelId',
			templateUrl: 'modules/models/views/view-model.client.view.html'
		}).
		state('editModel', {
			url: '/models/:modelId/edit',
			templateUrl: 'modules/models/views/edit-model.client.view.html'
		})
		// MODELS
    .state('dashboard.models', {
      abstract: false,
      url: '/models',
      templateUrl: 'modules/core/views/models/models.client.view.html',
      controller: 'ModelsViewController'
    })
    .state('dashboard.models.list', {
      abstract: false,
      url: '/list', // can also use- url: '/', but that has no semantic meaning.
      templateUrl: 'modules/models/views/list-models.client.view.html',
      controller: 'ModelsController'
    })
    .state('dashboard.models.list.details', {
      abstract: false,
      url: '/details/:modelId',
      templateUrl: 'modules/models/views/view-model.client.view.html',
      controller: 'ModelsController'
    })
    .state('dashboard.models.list.edit', {
      abstract: false,
      url: '/edit/:modelId',
      templateUrl: 'modules/models/views/edit-model.client.view.html',
      controller: 'ModelsController'
    })
    .state('dashboard.models.load', {
      abstract: false,
      url: '/load',
      templateUrl: 'modules/models/views/create-model.client.view.html',
      controller: 'ModelsController'
    })
    .state('dashboard.models.curate', {
      abstract: false,
      url: '/curate',
      templateUrl: 'modules/core/views/models/models.curate.client.view.html',
      controller: 'ModelsCurateViewController'
    })
    .state('dashboard.models.publish', {
      abstract: false,
      url: '/publish',
      templateUrl: 'modules/core/views/models/models.publish.client.view.html',
      controller: 'ModelsPublishViewController'
    });
	}
})();