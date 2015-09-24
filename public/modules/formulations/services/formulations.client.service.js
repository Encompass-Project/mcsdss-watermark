'use strict';

//Formulations service used to communicate Formulations REST endpoints
angular.module('formulations').factory('Formulations', ['$resource',
	function($resource) {
		return $resource('formulations/:formulationId', { formulationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);