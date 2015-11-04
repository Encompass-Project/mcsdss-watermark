(function() {
  'use strict';

  angular
    .module('documentation')
    .config(DocumentationRoutes);

  DocumentationRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function DocumentationRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('documentation', {
        abstract: false,
        url: '/documentation',
        templateUrl: 'modules/documentation/views/documentation.client.view.html',
        controller: 'DocumentationViewController'
      });
  }
})();