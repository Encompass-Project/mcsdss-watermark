(function() {
  'use strict';

  angular
    .module('documentation')
    .config(DocumentationRoutes);

  DocumentationRoutes.$inject = ['$stateProvider'];

  function DocumentationRoutes($stateProvider) {
    $stateProvider
      .state('documentation', {
        abstract: false,
        url: '/documentation',
        templateUrl: 'modules/documentation/views/documentation.client.view.html',
        controller: 'DocumentationViewController'
      });
  }
})();