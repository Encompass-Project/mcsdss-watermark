(function() {
    'use strict';

    angular
        .module('analyze')
        .controller('MapViewController', MapViewController);

    MapViewController.$inject = ['$scope', 'Authentication', 'mapConfig'];

    function MapViewController($scope, Authentication, mapConfig) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.updateView = updateView;

        // console.log(mapConfig);

        $scope.$on('analysisDataLoaded', function (event, args) {
            // console.log('Map View receiving broadcast.');
            // console.log(event, args);
            $scope.updateView(args);
        });

        function updateView(data) {
            // console.log('MapView Updated with new data:' , data);
            // console.log('mapViewCtrl.updateView(data): ', data);
        }
    }
})();