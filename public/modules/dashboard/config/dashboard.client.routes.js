(function() {
  'use strict';

  angular
    .module('dashboard')
    .config(DashboardRoutes);

  DashboardRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function DashboardRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard', {
        abstract: false,
        url: '/dashboard',
        templateUrl: 'modules/dashboard/views/dashboard.client.view.html',
        controller: 'DashboardViewController'
      });
  }
})();