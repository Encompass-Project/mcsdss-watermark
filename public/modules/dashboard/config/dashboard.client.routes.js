(function() {
  'use strict';

  angular
    .module('dashboard')
    .config(DashboardRoutes);

  DashboardRoutes.$inject = ['$stateProvider'];

  function DashboardRoutes($stateProvider) {

    // Define states.
    var dashboard_state = {
      abstract: false,
      url: '/dashboard',
      templateUrl: 'modules/dashboard/views/dashboard.client.view.html',
      controller: 'DashboardViewController',
      controllerAs: 'dashboard',
      data: {
        title: 'Dashboard'
      }
    };

    // Populate provider.
    $stateProvider
      .state('dashboard', dashboard_state);
  }
})();