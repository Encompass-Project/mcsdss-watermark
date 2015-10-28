(function() {
  'use strict';

  //Datasets service used to communicate Datasets REST endpoints
  angular
    .module('datasets')
    .factory('Datasets', Datasets);

  Datasets.$inject = ['$resource'];

	function Datasets($resource) {
		return $resource('datasets/:datasetId', { datasetId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
})();