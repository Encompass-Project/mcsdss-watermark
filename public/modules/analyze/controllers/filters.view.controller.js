(function() {
    'use strict';

    angular
        .module('analyze')
        .controller('FiltersViewController', FiltersViewController);

    FiltersViewController.$inject = ['$scope', 'Authentication'];

    function FiltersViewController($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.updateView = updateView;

        $scope.$on('analysisDataLoaded', function (event, args) {
            // console.log(event, args);
            console.log('Filters View receiving broadcast.');
            // $scope.updateView(args);
        });

        function updateView(data) {
            // console.log('MapView Updated with new data:' , data);
            // console.log('mapViewCtrl.updateView(data): ', data);
        }
    }
})();