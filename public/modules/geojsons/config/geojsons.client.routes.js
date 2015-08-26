'use strict';

//Setting up route
angular.module('geojsons').config(['$stateProvider',
	function($stateProvider) {
		// Geojsons state routing
		$stateProvider.
		state('case', {
			url: '/case',
			templateUrl: 'modules/geojsons/views/case.client.view.html'
		}).
		state('listGeojsons', {
			url: '/geojsons',
			templateUrl: 'modules/geojsons/views/list-geojsons.client.view.html'
		}).
		state('createGeojson', {
			url: '/geojsons/create',
			templateUrl: 'modules/geojsons/views/create-geojson.client.view.html'
		}).
		state('viewGeojson', {
			url: '/geojsons/:geojsonId',
			templateUrl: 'modules/geojsons/views/view-geojson.client.view.html'
		}).
		state('editGeojson', {
			url: '/geojsons/:geojsonId/edit',
			templateUrl: 'modules/geojsons/views/edit-geojson.client.view.html'
		});
	}
]);