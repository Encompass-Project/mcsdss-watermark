'use strict';

angular.module('core').controller('MapTestViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        // Standard Leaflet Map.
        // $scope.element = $('#mapPage');
        // $scope.element.height($scope.element.height());
        // $scope.map = L.map('map').setView([30.15, -97.85], 11);
        // // Add an OpenStreetMap tile layer
        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo($scope.map);


        $scope.location = 'Beru Farm';

        $scope.recallAllDroids = function () {
            console.log($scope.this, 'emitting event');
            $scope.$emit('requestDroidRecall');
        };

        $scope.$on('executeDroidRecall', function () {
            console.log($scope.this, 'receiving broadcast');
            $scope.location = 'Sandcrawler Beru';
        });
    }
]);




