'use strict';

angular.module('core').controller('MapViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.$on('analysisDataLoaded', function (event, args) {
            // console.log(event, args);
            console.log('Map View receiving broadcast.');
            $scope.updateView(args);
        });

        $scope.updateView = function (data) {
            console.log('mapViewCtrl.updateView(data): ', data);
        };
    }
]);




