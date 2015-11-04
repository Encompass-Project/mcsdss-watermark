(function() {
	'use strict';

	angular
		.module('datasets')
		.config(DatasetsRoutes);

	DatasetsRoutes.$inject = ['$stateProvider'];

	function DatasetsRoutes($stateProvider) {
		$stateProvider
      .state('datasets', {
        abstract: false,
        url: '/datasets',
        templateUrl: 'modules/datasets/views/datasets.client.view.html',
        controller: 'DatasetsViewController'
      })
      .state('datasets.list', {
        abstract: false,
        url: '/list',
        templateUrl: 'modules/datasets/views/list-datasets.client.view.html',
        controller: 'DatasetsController'
      })
      .state('datasets.list.details', {
        abstract: false,
        url: '/details/:datasetId',
        templateUrl: 'modules/datasets/views/view-dataset.client.view.html',
        controller: 'DatasetsController'
      })
      .state('datasets.list.edit', {
        abstract: false,
        url: '/edit/:datasetId',
        templateUrl: 'modules/datasets/views/edit-dataset.client.view.html',
        controller: 'DatasetsController'
      })
      .state('datasets.load', {
        abstract: false,
        url: '/load',
        templateUrl: 'modules/datasets/views/create-dataset.client.view.html',
        controller: 'DatasetsController'
      })
      .state('datasets.transform', {
        abstract: false,
        url: '/transform',
        templateUrl: 'modules/datasets/views/datasets.transform.client.view.html',
        controller: 'DatasetsTransformViewController'
      })
      .state('datasets.visualize', {
        abstract: false,
        url: '/visualize',
        templateUrl: 'modules/datasets/views/datasets.visualize.client.view.html',
        controller: 'DatasetsVisualizeViewController'
      });
	}
})();