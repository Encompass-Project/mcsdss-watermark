(function() {
  'use strict';

  angular
    .module('information')
    .config(InformationRoutes);

  InformationRoutes.$inject = ['$stateProvider'];

  function InformationRoutes($stateProvider) {

    // Define states.
    var information_state = {
      abstract: false,
      url: '/information',
      templateUrl: 'modules/information/views/information.client.view.html',
      controller: 'InformationViewController',
      controllerAs: 'informationView',
      data: {
        title: 'Information'
      }
    };

    var information_about_state = {
      abstract: false,
      url: '/about',
      templateUrl: 'modules/information/views/about.information.client.view.html',
      controller: 'AboutInformationViewController',
      controllerAs: 'informationAboutView',
      data: {
        title: 'About'
      }
    };

    // Populate provider.
    $stateProvider
      .state('information', information_state)
      .state('information.about', information_about_state);
  }
})();