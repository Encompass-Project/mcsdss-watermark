'use strict';

angular.module('core').controller('MapViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.$on('analysisDataLoaded', function () {
            // console.log($scope.this, 'receiving broadcast');
            console.log('Map View receiving broadcast');
            // console.log($scope.sourceData);
            $scope.updateView($scope.sourceData);
        });

        $scope.updateView = function (data) {
            // console.log($scope.sourceData);
            console.log('Map view updated.');
        };

        // Standard Leaflet Map.
        // $scope.element = $('#mapPage');
        // $scope.element.height($scope.element.height());
        // $scope.map = L.map('map').setView([30.15, -97.85], 11);
        // // Add an OpenStreetMap tile layer
        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo($scope.map);
    }
]);




