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
		});
	}
})();