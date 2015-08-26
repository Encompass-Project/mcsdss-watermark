'use strict';

// Configuring the Articles module
angular.module('geojsons').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Geojsons', 'geojsons', 'dropdown', '/geojsons(/create)?');
		Menus.addSubMenuItem('topbar', 'geojsons', 'List Geojsons', 'geojsons');
		Menus.addSubMenuItem('topbar', 'geojsons', 'New Geojson', 'geojsons/create');
	}
]);