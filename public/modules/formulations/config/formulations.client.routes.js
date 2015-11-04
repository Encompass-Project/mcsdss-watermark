(function() {
	'use strict';

	angular
		.module('formulations')
		.config(FormulationsRoutes);

	FormulationsRoutes.$inject =['$stateProvider'];

	function FormulationsRoutes($stateProvider) {
		$stateProvider
      .state('formulations', {
        abstract: false,
        url: '/formulations',
        templateUrl: 'modules/formulations/views/formulations.client.view.html',
        controller: 'FormulationsViewController'
      })
      .state('formulations.list', {
        abstract: false,
        url: '/list',
        templateUrl: 'modules/formulations/views/list-formulations.client.view.html',
        controller: 'FormulationsController'
      })
      .state('formulations.list.details', {
        abstract: false,
        url: '/details/:formulationId',
        templateUrl: 'modules/formulations/views/view-formulation.client.view.html',
        controller: 'FormulationsController'
      })
      .state('formulations.list.edit', {
        abstract: false,
        url: '/edit/:formulationId',
        templateUrl: 'modules/formulations/views/edit-formulation.client.view.html',
        controller: 'FormulationsController'
      })
      .state('formulations.load', {
        abstract: false,
        url: '/load',
        templateUrl: 'modules/formulations/views/create-formulation.client.view.html',
        controller: 'FormulationsController'
      });
	}
})();