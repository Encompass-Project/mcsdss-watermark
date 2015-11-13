(function() {
  'use strict';

  //Formulations service used to communicate Formulations REST endpoints
  angular
    .module('formulations')
    .factory('Formulations', Formulations);

  Formulations.$inject = ['$resource'];

	function Formulations($resource) {
		return $resource('formulations/:formulationId', { formulationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
})();