'use strict';

//Setting up route
angular.module('decisions').config(['$stateProvider',
	function($stateProvider) {
		// Decisions state routing
		$stateProvider.
		state('listDecisions', {
			url: '/decisions',
			templateUrl: 'modules/decisions/views/list-decisions.client.view.html'
		}).
		state('createDecision', {
			url: '/decisions/create',
			templateUrl: 'modules/decisions/views/create-decision.client.view.html'
		}).
		state('viewDecision', {
			url: '/decisions/:decisionId',
			templateUrl: 'modules/decisions/views/view-decision.client.view.html'
		}).
		state('editDecision', {
			url: '/decisions/:decisionId/edit',
			templateUrl: 'modules/decisions/views/edit-decision.client.view.html'
		});
	}
]);