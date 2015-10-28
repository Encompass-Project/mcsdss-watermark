(function() {
  'use strict';

  //Notebooks service used to communicate Notebooks REST endpoints
  angular
    .module('notebooks')
    .factory('Notebooks', Notebooks);

  Notebooks.$inject = ['$resource'];

	function Notebooks($resource) {
		return $resource('notebooks/:notebookId', { notebookId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
})();