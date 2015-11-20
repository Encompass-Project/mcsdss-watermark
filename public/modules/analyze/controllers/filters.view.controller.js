(function() {
    'use strict';

    angular
        .module('analyze')
        .controller('FiltersViewController', FiltersViewController);

    FiltersViewController.$inject = ['$scope', 'Authentication', 'maufConfig'];

    function FiltersViewController($scope, Authentication, maufConfig) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.updateView = updateView;

        $scope.$on('analysisDataLoaded', function (event, args) {
            $scope.maufConfig = maufConfig;
            // $scope.updateView(args);
            // $scope.updateView($scope.maufConfig);
        });

        function updateView(data) {
            // console.log('FiltersView updating with new data:' , data);
        }
    }
})();