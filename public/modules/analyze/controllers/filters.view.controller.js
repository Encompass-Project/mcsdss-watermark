(function() {
    'use strict';

    angular
        .module('analyze')
        .controller('FiltersViewController', FiltersViewController);

    FiltersViewController.$inject = ['$scope', 'Authentication', 'maufConfig']; // 'ui.bootstrap'

    function FiltersViewController($scope, Authentication, maufConfig) { // ui.bootstrap
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.updateView = updateView;

        // console.log(maufConfig);

        $scope.$on('analysisDataLoaded', function (event, args) {
            // console.log('FiltersView receiving broadcast.');
            // console.log(event, args);
            // $scope.updateView(args);
        });

        function updateView(data) {
            console.log('FiltersView updating with new data:' , data);
        }
    }
})();