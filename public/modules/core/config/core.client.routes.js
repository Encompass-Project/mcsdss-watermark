'use strict';
// Setting up routes.
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // Fall back on url-based routing for redirects and bad url catch-all.
    $urlRouterProvider
      .when('/formulations', '/formulations/list')
      .when('/datasets', '/datasets/list')
      .when('/models', '/models/list')
      .when('/analyze', '/analyze')   // This is required to refresh the view on nav change. Not yet sure why...
      .when('/decisions', '/decisions/list')
      // .when('/notebooks', '/notebooks/list')   // Still determining where these will live. Maybe under the formulation module?
      .when('/publications', '/publications/list')
      .when('/profile', '/profile/view')
      .otherwise('/');

    // Use state routing primarilly.
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
        // url: '/',
        templateUrl: 'modules/core/views/user.client.view.html',
        controller: 'UserViewController'
      })
      .state('dashboard.profile-view', {
        abstract: false,
        url: '/profile',
        templateUrl: 'modules/users/views/settings/view-profile.client.view.html',
        controller: 'SettingsController'
      })
      .state('dashboard.main', {
        abstract: false,
        url: '/dashboard',
        templateUrl: 'modules/core/views/dashboard/dashboard.client.view.html',
        controller: 'DashboardViewController'
      })
      // FORMULATIONS
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
      })
      // MODELS
      .state('dashboard.models', {
        abstract: false,
        url: '/models',
        templateUrl: 'modules/core/views/models/models.client.view.html',
        controller: 'ModelsViewController'
      })
      .state('dashboard.models.list', {
        abstract: false,
        url: '/list', // can also use- url: '/', but that has no semantic meaning.
        templateUrl: 'modules/models/views/list-models.client.view.html',
        controller: 'ModelsController'
      })
      .state('dashboard.models.list.details', {
        abstract: false,
        url: '/details/:modelId',
        templateUrl: 'modules/models/views/view-model.client.view.html',
        controller: 'ModelsController'
      })
      .state('dashboard.models.list.edit', {
        abstract: false,
        url: '/edit/:modelId',
        templateUrl: 'modules/models/views/edit-model.client.view.html',
        controller: 'ModelsController'
      })
      .state('dashboard.models.load', {
        abstract: false,
        url: '/load',
        templateUrl: 'modules/models/views/create-model.client.view.html',
        controller: 'ModelsController'
      })
      .state('dashboard.models.curate', {
        abstract: false,
        url: '/curate',
        templateUrl: 'modules/core/views/models/models.curate.client.view.html',
        controller: 'ModelsCurateViewController'
      })
      .state('dashboard.models.publish', {
        abstract: false,
        url: '/publish',
        templateUrl: 'modules/core/views/models/models.publish.client.view.html',
        controller: 'ModelsPublishViewController'
      })
      // ANALYZE
      .state('dashboard.analyze', {
        abstract: false,
        url: '/analyze',
        templateUrl: 'modules/core/views/analyze/analyze.client.view.html',
        controller: 'AnalyzeViewController'
      })
      .state('dashboard.analyze.layout', {
        abstract: false,
        url: '',
        views: {
          'graph': {
              templateUrl: 'modules/core/views/analyze/analyze.graph.client.view.html',
              controller: 'GraphViewController'
           },
           'map': {
              templateUrl: 'modules/core/views/analyze/analyze.map.client.view.html',
              controller: 'MapViewController'
          },
          'datatable': {
              templateUrl: 'modules/core/views/analyze/analyze.datatable.client.view.html',
              controller: 'DatatableViewController'
          }
        }
      })
      // DECISIONS
      .state('dashboard.decisions', {
        abstract: false,
        url: '/decisions',
        templateUrl: 'modules/core/views/decisions/decisions.client.view.html',
        controller: 'DecisionsViewController'
      })
      .state('dashboard.decisions.list', {
        abstract: false,
        url: '/list', // can also use- url: '/', but that has no semantic meaning.
        templateUrl: 'modules/decisions/views/list-decisions.client.view.html',
        controller: 'DecisionsController'
      })
      .state('dashboard.decisions.list.details', {
        abstract: false,
        url: '/details/:decisionId',
        templateUrl: 'modules/decisions/views/view-decision.client.view.html',
        controller: 'DecisionsController'
      })
      .state('dashboard.decisions.list.edit', {
        abstract: false,
        url: '/edit/:decisionId',
        templateUrl: 'modules/decisions/views/edit-decision.client.view.html',
        controller: 'DecisionsController'
      })
      .state('dashboard.decisions.load', {
        abstract: false,
        url: '/load',
        templateUrl: 'modules/decisions/views/create-decision.client.view.html',
        controller: 'DecisionsController'
      })
      .state('dashboard.decisions.curate', {
        abstract: false,
        url: '/curate',
        templateUrl: 'modules/core/views/decisions/curate-decisions.client.view.html',
        controller: 'CurateDecisionsViewController'
      })
      .state('dashboard.decisions.publish', {
        abstract: false,
        url: '/publish',
        templateUrl: 'modules/core/views/decisions/publish-decisions.client.view.html',
        controller: 'PublishDecisionsViewController'
      })
      // NOTEBOOKS
      // .state('dashboard.notebooks', {
      //   abstract: false,
      //   url: '/notebooks',
      //   templateUrl: 'modules/core/views/notebooks/notebooks.client.view.html',
      //   controller: 'NotebooksViewController'
      // })
      // .state('dashboard.notebooks.list', {
      //   abstract: false,
      //   url: '/list', // can also use- url: '/', but that has no semantic meaning.
      //   templateUrl: 'modules/notebooks/views/list-notebooks.client.view.html',
      //   controller: 'NotebooksController'
      // })
      // .state('dashboard.notebooks.list.details', {
      //   abstract: false,
      //   url: '/details/:notebookId',
      //   templateUrl: 'modules/notebooks/views/view-notebook.client.view.html',
      //   controller: 'NotebooksController'
      // })
      // .state('dashboard.notebooks.list.edit', {
      //   abstract: false,
      //   url: '/edit/:notebookId',
      //   templateUrl: 'modules/notebooks/views/edit-notebook.client.view.html',
      //   controller: 'NotebooksController'
      // })
      // .state('dashboard.notebooks.load', {
      //   abstract: false,
      //   url: '/load',
      //   templateUrl: 'modules/notebooks/views/create-notebook.client.view.html',
      //   controller: 'NotebooksController'
      // })
      // PUBLICATIONS
      .state('dashboard.publications', {
        abstract: false,
        url: '/publications',
        templateUrl: 'modules/core/views/publications/publications.client.view.html',
        controller: 'PublicationsViewController'
      })
      .state('dashboard.publications.list', {
        abstract: false,
        url: '/list', // can also use- url: '/', but that has no semantic meaning.
        templateUrl: 'modules/publications/views/list-publications.client.view.html',
        controller: 'PublicationsController'
      })
      .state('dashboard.publications.list.details', {
        abstract: false,
        url: '/details/:publicationId',
        templateUrl: 'modules/publications/views/view-publication.client.view.html',
        controller: 'PublicationsController'
      })
      .state('dashboard.publications.list.edit', {
        abstract: false,
        url: '/edit/:publicationId',
        templateUrl: 'modules/publications/views/edit-publication.client.view.html',
        controller: 'PublicationsController'
      })
      .state('dashboard.publications.load', {
        abstract: false,
        url: '/load',
        templateUrl: 'modules/publications/views/create-publication.client.view.html',
        controller: 'PublicationsController'
      })
      .state('dashboard.publications.curate', {
        abstract: false,
        url: '/curate',
        templateUrl: 'modules/core/views/publications/publications.curate.client.view.html',
        controller: 'PublicationsCurateViewController'
      })
      .state('dashboard.publications.publish', {
        abstract: false,
        url: '/publish',
        templateUrl: 'modules/core/views/publications/publications.publish.client.view.html',
        controller: 'PublicationsPublishViewController'
      })
      // PROFILE
      .state('dashboard.profile', {
        abstract: false,
        url: '/profile',
        templateUrl: 'modules/core/views/profile/profile.client.view.html',
        controller: 'ProfileViewController'
      })
      .state('dashboard.profile.view', {
        abstract: false,
        url: '/view', // can also use- url: '/', but that has no semantic meaning.
        templateUrl: 'modules/users/views/settings/view-profile.client.view.html',
        controller: 'SettingsController'
      })
      .state('dashboard.profile.edit', {
        abstract: false,
        url: '/edit',
        templateUrl: 'modules/users/views/settings/edit-profile.client.view.html',
        controller: 'SettingsController'
      })
      .state('dashboard.profile.accounts', {
        abstract: false,
        url: '/accounts',
        templateUrl: 'modules/users/views/settings/social-accounts.client.view.html',
        controller: 'SettingsController'
      })
      .state('dashboard.profile.password', {
        abstract: false,
        url: '/password',
        templateUrl: 'modules/users/views/settings/change-password.client.view.html',
        controller: 'SettingsController'
      });
  }
]);
