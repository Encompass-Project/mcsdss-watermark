(function() {
	'use strict';

	angular
		.module('models')
		.config(ModelsRoutes);

	ModelsRoutes.$inject =['$stateProvider'];

	function ModelsRoutes($stateProvider) {

    // Define states.
    var models_state = {
      abstract: false,
      url: '/models',
      templateUrl: 'modules/models/views/models.client.view.html',
      controller: 'ModelsViewController',
      controllerAs: 'modelsView'
    };

    var models_list_state = {
      abstract: false,
      url: '/list',
      templateUrl: 'modules/models/views/list-models.client.view.html',
      controller: 'ModelsController',
      controllerAs: 'models'
    };

    var models_list_details_state = {
      abstract: false,
      url: '/details/:modelId',
      templateUrl: 'modules/models/views/view-model.client.view.html',
      controller: 'ModelsController',
      controllerAs: 'models'
    };

    var models_list_edit_state = {
      abstract: false,
      url: '/edit/:modelId',
      templateUrl: 'modules/models/views/edit-model.client.view.html',
      controller: 'ModelsController',
      controllerAs: 'models'
    };

    var models_list_load_state = {
      abstract: false,
      url: '/load',
      templateUrl: 'modules/models/views/create-model.client.view.html',
      controller: 'ModelsController',
      controllerAs: 'models'
    };

    var models_list_design_state = {
      abstract: false,
      url: '/design',
      templateUrl: 'modules/models/views/models.design.client.view.html',
      controller: 'ModelsDesignViewController',
      controllerAs: 'modelsDesign'
    };

    // Populate provider.
		$stateProvider
      .state('models', models_state)
      .state('models.list', models_list_state)
      .state('models.list.details', models_list_details_state)
      .state('models.list.edit', models_list_edit_state)
      .state('models.list.load', models_list_load_state)
      .state('models.list.design', models_list_design_state);
	}
})();