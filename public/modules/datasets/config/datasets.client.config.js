(function() {
  'use strict';

  // Configuring the Articles module
  angular
    .module('datasets')
    .run(DatasetsConfig);

  DatasetsConfig.$inject = ['Menus'];

	function DatasetsConfig(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Datasets', 'datasets', 'dropdown', '/datasets(/create)?');
		Menus.addSubMenuItem('topbar', 'datasets', 'List Datasets', 'datasets');
		Menus.addSubMenuItem('topbar', 'datasets', 'New Dataset', 'datasets/create');
	}
})();