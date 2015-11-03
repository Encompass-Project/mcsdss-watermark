(function() {
	'use strict';

	//Setting up route
	angular
		.module('formulations')
		.config(FormulationsRoutes);

	FormulationsRoutes.$inject =['$stateProvider'];

	function FormulationsRoutes($stateProvider) {
		// Formulations state routing
		$stateProvider.
		state('listFormulations', {
			url: '/formulations',
			templateUrl: 'modules/formulations/views/list-formulations.client.view.html'
		}).
		state('createFormulation', {
			url: '/formulations/create',
			templateUrl: 'modules/formulations/views/create-formulation.client.view.html'
		}).
		state('viewFormulation', {
			url: '/formulations/:formulationId',
			templateUrl: 'modules/formulations/views/view-formulation.client.view.html'
		}).
		state('editFormulation', {
			url: '/formulations/:formulationId/edit',
			templateUrl: 'modules/formulations/views/edit-formulation.client.view.html'
		})
		// New
    .state('dashboard.formulations', {
      abstract: false,
      url: '/formulations',
      templateUrl: 'modules/core/views/formulations/formulations.client.view.html',
      controller: 'FormulationsViewController'
    })
    .state('dashboard.formulations.list', {
      abstract: false,
      url: '/list', // can also use- url: '/', but that has no semantic meaning.
      templateUrl: 'modules/formulations/views/list-formulations.client.view.html',
      controller: 'FormulationsController'
    })
    .state('dashboard.formulations.list.details', {
      abstract: false,
      url: '/details/:formulationId',
      templateUrl: 'modules/formulations/views/view-formulation.client.view.html',
      controller: 'FormulationsController'
    })
    .state('dashboard.formulations.list.edit', {
      abstract: false,
      url: '/edit/:formulationId',
      templateUrl: 'modules/formulations/views/edit-formulation.client.view.html',
      controller: 'FormulationsController'
    })
    .state('dashboard.formulations.load', {
      abstract: false,
      url: '/load',
      templateUrl: 'modules/formulations/views/create-formulation.client.view.html',
      controller: 'FormulationsController'
    })
    .state('dashboard.formulations.transform', {
      abstract: false,
      url: '/transform',
      templateUrl: 'modules/core/views/formulations/formulations.third.client.view.html',
      controller: 'FormulationsThirdViewController'
    })
    .state('dashboard.formulations.visualize', {
      abstract: false,
      url: '/visualize',
      templateUrl: 'modules/core/views/formulations/formulations.fourth.client.view.html',
      controller: 'FormulationsFourthViewController'
    })
    .state('dashboard.formulations.curate', {
      abstract: false,
      url: '/curate',
      templateUrl: 'modules/core/views/formulations/formulations.fifth.client.view.html',
      controller: 'FormulationsFifthViewController'
    })
    .state('dashboard.formulations.publish', {
      abstract: false,
      url: '/publish',
      templateUrl: 'modules/core/views/formulations/formulations.sixth.client.view.html',
      controller: 'FormulationsSixthViewController'
    });
	}
})();