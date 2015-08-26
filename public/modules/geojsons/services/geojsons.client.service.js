'use strict';

//Geojsons service used to communicate Geojsons REST endpoints
angular.module('geojsons').factory('Geojsons', ['$resource',
	function($resource) {
		return $resource('geojsons/:geojsonId', { geojsonId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);