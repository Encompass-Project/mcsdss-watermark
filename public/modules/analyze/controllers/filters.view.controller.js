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
            // console.log('analysisData event received by FiltersViewCTRL. Using the following config data: ');
            // console.log(args);

            $scope.maufConfig = maufConfig;
            // console.log($scope.maufConfig);

            // $scope.updateView(args);
            // $scope.updateView($scope.maufConfig);
        });

        function updateView(data) {
            // console.log('FiltersView updating with new data:' , data);
        }
    }
})();