'use strict';

//Datasets service used to communicate Datasets REST endpoints
angular.module('datasets').factory('Datasets', ['$resource',
	function($resource) {
		return $resource('datasets/:datasetId', { datasetId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);