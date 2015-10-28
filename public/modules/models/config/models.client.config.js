(function() {
  'use strict';

  // Configuring the Articles module
  // Uncomment to include in topbar navigation.

  angular
    .module('models')
    .run(ModelsConfig);

  ModelsConfig.$inject = ['Menus'];

	function ModelsConfig(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Models', 'models', 'dropdown', '/models(/create)?');
		Menus.addSubMenuItem('topbar', 'models', 'List Models', 'models');
		Menus.addSubMenuItem('topbar', 'models', 'New Model', 'models/create');
	}
})();