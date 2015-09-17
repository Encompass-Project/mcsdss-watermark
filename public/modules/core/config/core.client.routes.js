'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider
			// .state('public', {
			// 	url: '/',
			// 	templateUrl: 'modules/core/views/default.client.view.html',
			// 	controller: 'DefaultViewController'
			// })
			.state('dashboard', {
				url: '/',
				templateUrl: 'modules/core/views/home.client.view.html',
				controller: 'HomeController'
			});
	}
]);