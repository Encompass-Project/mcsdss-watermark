'use strict';

angular.module('core').controller('GraphTestViewController', ['$scope', '$state', '$location', 'Authentication',
    function ($scope, $state, $location, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.clicked = function (target) {
            console.log(target);
        };

        // INHERITED SCOPE.
        // APPROACH 1.
        // Directly connected to parent scope.
        // Binding breaks as soon as child scope changes value.
        //
        // $scope.sell = function(newLocation) {
        //     $scope.location = newLocation;
        // };

        // APPROACH 2.
        // Inherited scope.
        //
        // $scope.summon = function(newLocation) {
        //     $scope.sandcrawler.location = newLocation;
        // };

        // EVENT-BASED.
        // APPROACH 1.
        // EMIT from CHILD.
        //
        // $scope.location = "Owen Farm";
        // $scope.summon = function() {
        //     $scope.$emit('summon', $scope.location);
        // };

        // APPROACH 2.
        // BROADCAST from PARENT.
        //
        // $scope.location = "Owen Farm";
        // $scope.$on('recall', function (e, newLocation) {
        //     $scope.location = newLocation;
        // });

        // APPROACH 3.
        // SIBLINGS via PARENT.
        //
        $scope.location = 'Owen Farm';

        $scope.recallAllDroids = function () {
            console.log($scope.this, 'emitting event');
            $scope.$emit('requestDroidRecall');
        };

        $scope.$on('executeDroidRecall', function () {
            console.log($scope.this, 'receiving broadcast');
            $scope.location = 'Sandcrawler Owen';
        });

}]);