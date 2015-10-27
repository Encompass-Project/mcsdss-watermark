(function() {
  'use strict';

  //Publications service used to communicate Publications REST endpoints
  angular
    .module('publications')
    .factory('Publications', Publications);

  Publications.$inject = ['$resource'];

	function Publications($resource) {
		return $resource('publications/:publicationId', { publicationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
})();