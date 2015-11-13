(function() {
  'use strict';

  angular
    .module('documentation')
    .config(DocumentationRoutes);

  DocumentationRoutes.$inject = ['$stateProvider'];

  function DocumentationRoutes($stateProvider) {

    // Define states.
    var documentation_state = {
      abstract: false,
      url: '/documentation',
      templateUrl: 'modules/documentation/views/documentation.client.view.html',
      controller: 'DocumentationViewController',
      controllerAs: 'documentation',
      data: {
        title: 'Documents'
      }
    };

    // Populate provider.
    $stateProvider
      .state('documentation', documentation_state);
  }
})();