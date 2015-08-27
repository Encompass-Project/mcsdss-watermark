'use strict';

//Decisions service used to communicate Decisions REST endpoints
angular.module('decisions').factory('Decisions', ['$resource',
	function($resource) {
		return $resource('decisions/:decisionId', { decisionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);