'use strict';

angular.module('core').controller('UserViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        // $scope.defaultTemplate = {
        //     'path':'modules/core/views/default.client.view.html'
        // };

        // $scope.userTemplate = {
        //     'path':'modules/core/views/user.client.view.html'
        // };

        $scope.displayName = $scope.authentication.user.displayName;

        // $scope.selectedTemplate = {
        //     'path':'modules/core/views/dashboard/dashboard.client.view.html'
        // };

        $scope.clicked = function(target) {
            // var this = target;
            console.log(target);
        };
    }
]);