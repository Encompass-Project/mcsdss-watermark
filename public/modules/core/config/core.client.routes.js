'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		// Redirect to home view when route not found.
		$urlRouterProvider.otherwise('/');

		// State routing.
		$stateProvider
			.state('home', {
				abstract: false,
				url: '/',
				controller: 'HomeViewController'
			})
			.state('anon', {
				abstract: false,
				url: '/',
				templateUrl: 'modules/core/views/default.client.view.html',
				controller: 'DefaultViewController'
			})
			.state('dashboard', {
				abstract: false,
				templateUrl: 'modules/core/views/user.client.view.html',
				controller: 'UserViewController'
			})
			.state('dashboard.main', {
				abstract: false,
				url: '/dashboard',
				templateUrl: 'modules/core/views/dashboard/dashboard.client.view.html',
				// template: '<h1>DASHBOARD.MAIN</h1>',
				controller: 'UserViewController'
			})
			.state('dashboard.datasets', {
				abstract: false,
				url: '/datasets',
				templateUrl: 'modules/core/views/datasets/datasets.client.view.html',
				// template: '<h1>DASHBOARD.DATASETS</h1>',
				controller: 'DatasetsViewController'
			})
			.state('dashboard.models', {
				abstract: false,
				url: '/models',
				templateUrl: 'modules/core/views/models/models.client.view.html',
				// template: '<h1>DASHBOARD.MODELS</h1>',
				controller: 'UserViewController'
			})
			.state('dashboard.goals', {
				abstract: false,
				url: '/goals',
				templateUrl: 'modules/core/views/goals/goals.client.view.html',
				// template: '<h1>DASHBOARD.GOALS</h1>',
				controller: 'UserViewController'
			})
			.state('dashboard.decisions', {
				abstract: false,
				url: '/decisions',
				templateUrl: 'modules/core/views/decisions/decisions.client.view.html',
				// template: '<h1>DASHBOARD.DECISIONS</h1>',
				controller: 'UserViewController'
			})
			.state('dashboard.notebooks', {
				abstract: false,
				url: '/notebooks',
				templateUrl: 'modules/core/views/notebooks/notebooks.client.view.html',
				// template: '<h1>DASHBOARD.NOTEBOOKS</h1>',
				controller: 'UserViewController'
			})
			.state('dashboard.publications', {
				abstract: false,
				url: '/publications',
				templateUrl: 'modules/core/views/publications/publications.client.view.html',
				// template: '<h1>DASHBOARD.PUBLICATIONS</h1>',
				controller: 'UserViewController'
			});
	}
]);