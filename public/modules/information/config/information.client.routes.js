(function() {
  'use strict';

  angular
    .module('information')
    .config(InformationRoutes);

  InformationRoutes.$inject = ['$stateProvider'];

  function InformationRoutes($stateProvider) {
    $stateProvider
      .state('information', {
        abstract: false,
        url: '/information',
        templateUrl: 'modules/information/views/information.client.view.html',
        controller: 'InformationViewController'
      })
      .state('information.about', {
        abstract: false,
        url: '/about',
        templateUrl: 'modules/information/views/about.information.client.view.html',
        controller: 'AboutInformationViewController'
      });
  }
})();