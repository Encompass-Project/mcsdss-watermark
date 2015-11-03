(function() {
	'use strict';

	angular
		.module('datasets')
		.config(DatasetsRoutes);

	DatasetsRoutes.$inject = ['$stateProvider'];

	function DatasetsRoutes($stateProvider) {
		// Datasets state routing
		$stateProvider.
		state('listDatasets', {
			url: '/datasets',
			templateUrl: 'modules/datasets/views/list-datasets.client.view.html'
		}).
		state('createDataset', {
			url: '/datasets/create',
			templateUrl: 'modules/datasets/views/create-dataset.client.view.html'
		}).
		state('viewDataset', {
			url: '/datasets/:datasetId',
			templateUrl: 'modules/datasets/views/view-dataset.client.view.html'
		}).
		state('editDataset', {
			url: '/datasets/:datasetId/edit',
			templateUrl: 'modules/datasets/views/edit-dataset.client.view.html'
		})
		// DATASETS
    .state('dashboard.datasets', {
      abstract: false,
      url: '/datasets',
      templateUrl: 'modules/core/views/datasets/datasets.client.view.html',
      controller: 'DatasetsViewController'
    })
    .state('dashboard.datasets.list', {
      abstract: false,
      url: '/list', // can also use- url: '/', but that has no semantic meaning.
      templateUrl: 'modules/datasets/views/list-datasets.client.view.html',
      controller: 'DatasetsController'
    })
    .state('dashboard.datasets.list.details', {
      abstract: false,
      url: '/details/:datasetId',
      templateUrl: 'modules/datasets/views/view-dataset.client.view.html',
      controller: 'DatasetsController'
    })
    .state('dashboard.datasets.list.edit', {
      abstract: false,
      url: '/edit/:datasetId',
      templateUrl: 'modules/datasets/views/edit-dataset.client.view.html',
      controller: 'DatasetsController'
    })
    .state('dashboard.datasets.load', {
      abstract: false,
      url: '/load',
      templateUrl: 'modules/datasets/views/create-dataset.client.view.html',
      controller: 'DatasetsController'
    })
    .state('dashboard.datasets.transform', {
      abstract: false,
      url: '/transform',
      templateUrl: 'modules/core/views/datasets/datasets.transform.client.view.html',
      controller: 'DatasetsTransformViewController'
    })
    .state('dashboard.datasets.visualize', {
      abstract: false,
      url: '/visualize',
      templateUrl: 'modules/core/views/datasets/datasets.visualize.client.view.html',
      controller: 'DatasetsVisualizeViewController'
    })
    .state('dashboard.datasets.curate', {
      abstract: false,
      url: '/curate',
      templateUrl: 'modules/core/views/datasets/datasets.curate.client.view.html',
      controller: 'DatasetsCurateViewController'
    })
    .state('dashboard.datasets.publish', {
      abstract: false,
      url: '/publish',
      templateUrl: 'modules/core/views/datasets/datasets.publish.client.view.html',
      controller: 'DatasetsPublishViewController'
    });
	}
})();