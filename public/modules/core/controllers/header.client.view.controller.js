(function() {
	'use strict';

	angular
		.module('core')
		.run(StateConfig)
		.controller('HeaderController', HeaderController);

	StateConfig.$inject = ['$rootScope', '$state', '$stateParams'];

	function StateConfig($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
	}

	HeaderController.$inject = ['$rootScope', '$scope', 'Authentication', 'Menus'];

	function HeaderController($rootScope, $scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.currentRoute = 'Navigation';
		$scope.toggleCollapsibleMenu = toggleCollapsibleMenu;
		$scope.changeNavIcon = changeNavIcon;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		// console.log($scope.currentRoute);
		$scope.current_icon = 'fa-desktop'; // fa-globe, fa-desktop, fa-area-chart, fa-puzzle-piece, fa-database, fa-cubes, fa-newspaper-o

		// Need to consolidate all app info into a config object that is shared across modules.
		$scope.appTitle = 'Watermark';
		$scope.versionNumber = 'Alpha v0.23.314';
		// $scope.iconpath = '/modules/core/img/brand/conflux-logo-v1-icon-white-nods.png';
		$scope.iconpath = '/modules/core/img/brand/watermark_logo_20151223_v014c2_transparent.png';

		function toggleCollapsibleMenu() {
			$scope.isCollapsed = !$scope.isCollapsed;
		}

		function changeNavIcon() {
			// console.log($rootScope.$state.current.data.title);

			switch ($rootScope.$state.current.data.title) {
				case 'Dashboard':
				  $scope.current_icon = 'fa-desktop';
				  break;
				case 'Analyze':
				  $scope.current_icon = 'fa-area-chart';
				  break;
				case 'Formulations':
				  $scope.current_icon = 'fa-puzzle-piece';
				  break;
				case 'Data Sources':
				  $scope.current_icon = 'fa-database';
				  break;
				case 'Models':
				  $scope.current_icon = 'fa-cubes';
				  break;
				case 'Publications':
				  $scope.current_icon = 'fa-newspaper-o';
				  break;
				case 'Profile':
				  $scope.current_icon = 'fa-user';
				  break;
				case 'Documents':
				  $scope.current_icon = 'fa-file-text';
				  break;
				case 'About':
				  $scope.current_icon = 'fa-info-circle';
				  break;
			}
		}

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function(event) {
			// console.log('state changed', event);
			$scope.isCollapsed = false;
			changeNavIcon();
		});

	}
})();