(function() {
	'use strict';

	angular
		.module('formulations')
		.config(FormulationsRoutes);

	FormulationsRoutes.$inject =['$stateProvider'];

	function FormulationsRoutes($stateProvider) {

    // Define states.
    var formulations_state = {
      abstract: false,
      url: '/formulations',
      templateUrl: 'modules/formulations/views/formulations.client.view.html',
      controller: 'FormulationsViewController',
      controllerAs: 'formulationsView',
      data: {
        title: 'Formulations'
      }
    };

    var formulations_list_state = {
      abstract: false,
      url: '/list',
      templateUrl: 'modules/formulations/views/list-formulations.client.view.html',
      controller: 'FormulationsController',
      controllerAs: 'formulations'
    };

    var formulations_list_details_state = {
      abstract: false,
      url: '/details/:formulationId',
      templateUrl: 'modules/formulations/views/view-formulation.client.view.html',
      controller: 'FormulationsController',
      controllerAs: 'formulations'
    };

    var formulations_list_edit_state = {
      abstract: false,
      url: '/edit/:formulationId',
      templateUrl: 'modules/formulations/views/edit-formulation.client.view.html',
      controller: 'FormulationsController',
      controllerAs: 'formulations'
    };

    var formulations_list_load_state = {
      abstract: false,
      url: '/load',
      templateUrl: 'modules/formulations/views/create-formulation.client.view.html',
      controller: 'FormulationsController',
      controllerAs: 'formulations'
    };

    // Populate provider.
		$stateProvider
      .state('formulations', formulations_state)
      .state('formulations.list', formulations_list_state)
      .state('formulations.list.details', formulations_list_details_state)
      .state('formulations.list.edit', formulations_list_edit_state)
      .state('formulations.list.load', formulations_list_load_state);
	}
})();