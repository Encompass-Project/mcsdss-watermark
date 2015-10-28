(function() {
	'use strict';

	angular
		.module('core')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', 'Authentication', 'Menus'];

	function HeaderController($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.toggleCollapsibleMenu = toggleCollapsibleMenu;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		function toggleCollapsibleMenu() {
			$scope.isCollapsed = !$scope.isCollapsed;
		}

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		// $scope.filter('customNavbarOrder', function() {
		// 	function navbarOrder(subitem) {
		// 		// tbd.
		// 	}
		// });
	}
})();