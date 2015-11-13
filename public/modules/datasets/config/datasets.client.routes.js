(function() {
	'use strict';

	angular
		.module('datasets')
		.config(DatasetsRoutes);

	DatasetsRoutes.$inject = ['$stateProvider'];

	function DatasetsRoutes($stateProvider) {

    // Define states.
    var datasets_state = {
      abstract: false,
      url: '/datasets',
      templateUrl: 'modules/datasets/views/datasets.client.view.html',
      controller: 'DatasetsViewController',
      controllerAs: 'datasetsView',
      data: {
        title: 'Data Sources'
      }
    };

    var datasets_list_state = {
      abstract: false,
      url: '/list',
      templateUrl: 'modules/datasets/views/list-datasets.client.view.html',
      controller: 'DatasetsController',
      controllerAs: 'datasets'
    };

    var datasets_list_details_state = {
      abstract: false,
      url: '/details/:datasetId',
      templateUrl: 'modules/datasets/views/view-dataset.client.view.html',
      controller: 'DatasetsController',
      controllerAs: 'datasets'
    };

    var datasets_list_edit_state = {
      abstract: false,
      url: '/edit/:datasetId',
      templateUrl: 'modules/datasets/views/edit-dataset.client.view.html',
      controller: 'DatasetsController',
      controllerAs: 'datasets'
    };

    var datasets_list_load_state = {
      abstract: false,
      url: '/load',
      templateUrl: 'modules/datasets/views/create-dataset.client.view.html',
      controller: 'DatasetsController',
      controllerAs: 'datasets'
    };

    var datasets_list_transform_state = {
      abstract: false,
      url: '/transform',
      templateUrl: 'modules/datasets/views/datasets.transform.client.view.html',
      controller: 'DatasetsTransformViewController',
      controllerAs: 'datasetsTransform'
    };

    var datasets_list_visualize_state = {
      abstract: false,
      url: '/visualize',
      templateUrl: 'modules/datasets/views/datasets.visualize.client.view.html',
      controller: 'DatasetsVisualizeViewController',
      controllerAs: 'datasetsVisualize'
    };

    // Populate provider.
		$stateProvider
      .state('datasets', datasets_state)
      .state('datasets.list', datasets_list_state)
      .state('datasets.list.details', datasets_list_details_state)
      .state('datasets.list.edit', datasets_list_edit_state)
      .state('datasets.list.load', datasets_list_load_state)
      .state('datasets.list.transform', datasets_list_transform_state)
      .state('datasets.list.visualize', datasets_list_visualize_state);
	}
})();