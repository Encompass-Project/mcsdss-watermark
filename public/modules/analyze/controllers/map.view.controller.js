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

        $scope.$on('analysisDataLoaded', function (event, args) {
            $scope.mapConfig = mapConfig;
            // $scope.updateView(args);
            // $scope.updateView($scope.mapConfig);
        });

        function updateView(data) {
            // console.log('MapView Updated with new data:' , data);
        }
    }
})();