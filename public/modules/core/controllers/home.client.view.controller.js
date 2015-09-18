'use strict';

angular.module('core').controller('HomeViewController', ['$scope', 'Authentication', '$state',
	function($scope, Authentication, $state) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        if ($scope.authentication.user === '') {
            // console.log('NO AUTH!');
            $state.go('anon');
        } else {
            // console.log('WELCOME');
            $state.go('dashboard.main');
        }

        // $scope.defaultTemplate = {
        //     'path':'modules/core/views/default.client.view.html'
        // };

        // $scope.userTemplate = {
        //     'path':'modules/core/views/user.client.view.html'
        // };

	}
]);