(function() {
  'use strict';

  //Models service used to communicate Models REST endpoints
  angular
    .module('models')
    .factory('Models', Models);

  Models.$inject = ['$resource'];

	function Models($resource) {
		return $resource('models/:modelId', { modelId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
})();