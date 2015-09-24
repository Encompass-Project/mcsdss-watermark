'use strict';
// Setting up routes.
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // Fall back on url-based routing for redirects and bad url catch-all.
    $urlRouterProvider
      .when('/datasets', '/datasets/list')
      .when('/models', '/models/list')
      // .when('/goals', '/goals/list')
      .when('/formulations', '/formulations/list')
      .when('/decisions', '/decisions/list')
      .when('/notebooks', '/notebooks/list')
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
      // DATASETS
      .state('dashboard.datasets', {
        abstract: false,
        url: '/datasets',
        templateUrl: 'modules/core/views/datasets/datasets.client.view.html',
        controller: 'DatasetsViewController'
      })
      .state('dashboard.datasets.list', {
        abstract: false,
        url: '/list', // can also use- url: '/',
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
        url: '/list', // can also use- url: '/',
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
      .state('dashboard.models.transform', {
        abstract: false,
        url: '/transform',
        templateUrl: 'modules/core/views/models/models.third.client.view.html',
        controller: 'ModelsThirdViewController'
      })
      .state('dashboard.models.visualize', {
        abstract: false,
        url: '/visualize',
        templateUrl: 'modules/core/views/models/models.fourth.client.view.html',
        controller: 'ModelsFourthViewController'
      })
      .state('dashboard.models.curate', {
        abstract: false,
        url: '/curate',
        templateUrl: 'modules/core/views/models/models.fifth.client.view.html',
        controller: 'ModelsFifthViewController'
      })
      .state('dashboard.models.publish', {
        abstract: false,
        url: '/publish',
        templateUrl: 'modules/core/views/models/models.sixth.client.view.html',
        controller: 'ModelsSixthViewController'
      })
      // GOALS
      // .state('dashboard.goals', {
      //   abstract: false,
      //   url: '/goals',
      //   templateUrl: 'modules/core/views/goals/goals.client.view.html',
      //   controller: 'GoalsViewController'
      // })
      // .state('dashboard.goals.list', {
      //   abstract: false,
      //   url: '/list', // can also use- url: '/',
      //   templateUrl: 'modules/goals/views/list-goals.client.view.html',
      //   controller: 'GoalsController'
      // })
      // .state('dashboard.goals.list.details', {
      //   abstract: false,
      //   url: '/details/:goalId',
      //   templateUrl: 'modules/goals/views/view-goal.client.view.html',
      //   controller: 'GoalsController'
      // })
      // .state('dashboard.goals.list.edit', {
      //   abstract: false,
      //   url: '/edit/:goalId',
      //   templateUrl: 'modules/goals/views/edit-goal.client.view.html',
      //   controller: 'GoalsController'
      // })
      // .state('dashboard.goals.load', {
      //   abstract: false,
      //   url: '/load',
      //   templateUrl: 'modules/goals/views/create-goal.client.view.html',
      //   controller: 'GoalsController'
      // })
      // .state('dashboard.goals.transform', {
      //   abstract: false,
      //   url: '/transform',
      //   templateUrl: 'modules/core/views/goals/goals.third.client.view.html',
      //   controller: 'GoalsThirdViewController'
      // })
      // .state('dashboard.goals.visualize', {
      //   abstract: false,
      //   url: '/visualize',
      //   templateUrl: 'modules/core/views/goals/goals.fourth.client.view.html',
      //   controller: 'GoalsFourthViewController'
      // })
      // .state('dashboard.goals.curate', {
      //   abstract: false,
      //   url: '/curate',
      //   templateUrl: 'modules/core/views/goals/goals.fifth.client.view.html',
      //   controller: 'GoalsFifthViewController'
      // })
      // .state('dashboard.goals.publish', {
      //   abstract: false,
      //   url: '/publish',
      //   templateUrl: 'modules/core/views/goals/goals.sixth.client.view.html',
      //   controller: 'GoalsSixthViewController'
      // })
      // FORMULATIONS
      .state('dashboard.formulations', {
        abstract: false,
        url: '/formulations',
        templateUrl: 'modules/core/views/formulations/formulations.client.view.html',
        controller: 'FormulationsViewController'
      })
      .state('dashboard.formulations.list', {
        abstract: false,
        url: '/list', // can also use- url: '/',
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
      // ANALYZE
      .state('dashboard.analyze', {
        abstract: false,
        url: '/analyze',
        templateUrl: 'modules/core/views/analyze/analyze.client.view.html',
        controller: 'AnalyzeViewController'
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
        url: '/list', // can also use- url: '/',
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
      .state('dashboard.decisions.transform', {
        abstract: false,
        url: '/transform',
        templateUrl: 'modules/core/views/decisions/decisions.third.client.view.html',
        controller: 'DecisionsThirdViewController'
      })
      .state('dashboard.decisions.visualize', {
        abstract: false,
        url: '/visualize',
        templateUrl: 'modules/core/views/decisions/decisions.fourth.client.view.html',
        controller: 'DecisionsFourthViewController'
      })
      .state('dashboard.decisions.curate', {
        abstract: false,
        url: '/curate',
        templateUrl: 'modules/core/views/decisions/decisions.fifth.client.view.html',
        controller: 'DecisionsFifthViewController'
      })
      .state('dashboard.decisions.publish', {
        abstract: false,
        url: '/publish',
        templateUrl: 'modules/core/views/decisions/decisions.sixth.client.view.html',
        controller: 'DecisionsSixthViewController'
      })
      // NOTEBOOKS
      .state('dashboard.notebooks', {
        abstract: false,
        url: '/notebooks',
        templateUrl: 'modules/core/views/notebooks/notebooks.client.view.html',
        controller: 'NotebooksViewController'
      })
      .state('dashboard.notebooks.list', {
        abstract: false,
        url: '/list', // can also use- url: '/',
        templateUrl: 'modules/notebooks/views/list-notebooks.client.view.html',
        controller: 'NotebooksController'
      })
      .state('dashboard.notebooks.list.details', {
        abstract: false,
        url: '/details/:notebookId',
        templateUrl: 'modules/notebooks/views/view-notebook.client.view.html',
        controller: 'NotebooksController'
      })
      .state('dashboard.notebooks.list.edit', {
        abstract: false,
        url: '/edit/:notebookId',
        templateUrl: 'modules/notebooks/views/edit-notebook.client.view.html',
        controller: 'NotebooksController'
      })
      .state('dashboard.notebooks.load', {
        abstract: false,
        url: '/load',
        templateUrl: 'modules/notebooks/views/create-notebook.client.view.html',
        controller: 'NotebooksController'
      })
      .state('dashboard.notebooks.transform', {
        abstract: false,
        url: '/transform',
        templateUrl: 'modules/core/views/notebooks/notebooks.third.client.view.html',
        controller: 'NotebooksThirdViewController'
      })
      .state('dashboard.notebooks.visualize', {
        abstract: false,
        url: '/visualize',
        templateUrl: 'modules/core/views/notebooks/notebooks.fourth.client.view.html',
        controller: 'NotebooksFourthViewController'
      })
      .state('dashboard.notebooks.curate', {
        abstract: false,
        url: '/curate',
        templateUrl: 'modules/core/views/notebooks/notebooks.fifth.client.view.html',
        controller: 'NotebooksFifthViewController'
      })
      .state('dashboard.notebooks.publish', {
        abstract: false,
        url: '/publish',
        templateUrl: 'modules/core/views/notebooks/notebooks.sixth.client.view.html',
        controller: 'NotebooksSixthViewController'
      })
      // PUBLICATIONS
      .state('dashboard.publications', {
        abstract: false,
        url: '/publications',
        templateUrl: 'modules/core/views/publications/publications.client.view.html',
        controller: 'PublicationsViewController'
      })
      .state('dashboard.publications.list', {
        abstract: false,
        url: '/list', // can also use- url: '/',
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
      .state('dashboard.publications.transform', {
        abstract: false,
        url: '/transform',
        templateUrl: 'modules/core/views/publications/publications.third.client.view.html',
        controller: 'PublicationsThirdViewController'
      })
      .state('dashboard.publications.visualize', {
        abstract: false,
        url: '/visualize',
        templateUrl: 'modules/core/views/publications/publications.fourth.client.view.html',
        controller: 'PublicationsFourthViewController'
      })
      .state('dashboard.publications.curate', {
        abstract: false,
        url: '/curate',
        templateUrl: 'modules/core/views/publications/publications.fifth.client.view.html',
        controller: 'PublicationsFifthViewController'
      })
      .state('dashboard.publications.publish', {
        abstract: false,
        url: '/publish',
        templateUrl: 'modules/core/views/publications/publications.sixth.client.view.html',
        controller: 'PublicationsSixthViewController'
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
        url: '/view', // can also use- url: '/',
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
