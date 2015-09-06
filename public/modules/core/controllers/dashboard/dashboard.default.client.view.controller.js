'use strict';

angular.module('core').controller('DashboardDefaultViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'dashboard.default.client.view.html';

        $scope.currentActivity = {
            actions: [
                'Things are happening around here',
                'Things are happening all about',
                'Things are happening sometimes',
                'Things are happening I think',
                'Things are happening right?',
                'Things are happening somewhere',
                'Things are happening probably',
                'Things are happening presumably',
                'Things are happening to someone',
                'Things are happening someplace',
                'Things are happening someplace',
                'Things are happening someplace'
            ]
        };

        $scope.currentDatasets = {
            datasets: [
                'Dataset 1',
                'Dataset 2',
                'Dataset 3'
            ]
        };

        $scope.currentModels = {
            models: [
                'Model 1',
                'Model 2',
                'Model 3'
            ]
        };

        $scope.currentGoals = {
            goals: [
                'Goal 1',
                'Goal 2',
                'Goal 3'
            ]
        };

        $scope.currentDecisions = {
            decisions: [
                'Decision 1',
                'Decision 2',
                'Decision 3'
            ]
        };

        $scope.currentNotebooks = {
            notebooks: [
                'Notebook 1',
                'Notebook 2',
                'Notebook 3'
            ]
        };

        $scope.currentPublications = {
            publications: [
                'Publication 1',
                'Publication 2',
                'Publication 3'
            ]
        };

    }
]);