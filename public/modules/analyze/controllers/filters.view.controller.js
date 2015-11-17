(function() {
    'use strict';

    angular
        .module('analyze')
        .controller('FiltersViewController', FiltersViewController);

    FiltersViewController.$inject = ['$scope', 'Authentication']; // 'ui.bootstrap'

    function FiltersViewController($scope, Authentication) { // ui.bootstrap
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.updateView = updateView;

        $scope.$on('analysisDataLoaded', function (event, args) {
            // console.log(event, args);
            // console.log('FiltersView receiving broadcast.');
            // $scope.updateView(args);
        });

        function updateView(data) {
            console.log('FiltersView updating with new data:' , data);
        }
    }
})();