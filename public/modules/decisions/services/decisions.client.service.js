(function() {
  'use strict';

  //Decisions service used to communicate Decisions REST endpoints
  angular
    .module('decisions')
    .factory('Decisions', Decisions);

  Decisions.$inject = ['$resource'];

	function Decisions($resource) {
		return $resource('decisions/:decisionId', { decisionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
})();