'use strict';

// Setting up routes.
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

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
				controller: 'DashboardViewController'
			})
			.state('dashboard.datasets', {
				abstract: false,
				url: '/datasets',
				templateUrl: 'modules/core/views/datasets/datasets.client.view.html',
				controller: 'DatasetsViewController'
			})
			.state('dashboard.models', {
				abstract: false,
				url: '/models',
				templateUrl: 'modules/core/views/models/models.client.view.html',
				controller: 'ModelsViewController'
			})
			.state('dashboard.goals', {
				abstract: false,
				url: '/goals',
				templateUrl: 'modules/core/views/goals/goals.client.view.html',
				controller: 'GoalsViewController'
			})
			.state('dashboard.decisions', {
				abstract: false,
				url: '/decisions',
				templateUrl: 'modules/core/views/decisions/decisions.client.view.html',
				controller: 'DecisionsViewController'
			})
			.state('dashboard.notebooks', {
				abstract: false,
				url: '/notebooks',
				templateUrl: 'modules/core/views/notebooks/notebooks.client.view.html',
				controller: 'NotebooksViewController'
			})
			.state('dashboard.publications', {
				abstract: false,
				url: '/publications',
				templateUrl: 'modules/core/views/publications/publications.client.view.html',
				controller: 'PublicationsViewController'
			});
	}
]);