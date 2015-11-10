(function() {
  'use strict';

  angular
    .module('core')
    .controller('DatatableViewController', DatatableViewController);

  DatatableViewController.$inject = ['$scope', 'Authentication', '$filter', 'ngTableParams', 'AnalysisDataFactory'];

  function DatatableViewController($scope, Authentication, $filter, ngTableParams, AnalysisDataFactory) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    // Expose public API.
    $scope.headerFilter = headerFilter;
    $scope.datasetOrder = datasetOrder;
    $scope.rowClicked = rowClicked;
    $scope.decorateSiblings = decorateSiblings;
    $scope.clearSiblings = clearSiblings;
    $scope.updateView = updateView;

    // Private members.
    $scope.headerdata = [];
    $scope.tabledata = [];
    $scope.suf01 = 0;
    $scope.suf02 = 0;
    $scope.suf03 = 0;
    $scope.muf = 0;

    $scope.$on('analysisDataLoaded', function(event, args) {
      // console.log('analysisDataLoaded...', event, args);
      // console.log('Datatable View receiving broadcast.');
      $scope.updateView(args);
    });

    function headerFilter(target) {
      return target.visible;
    }

    function datasetOrder(key) {
      // console.log(key);
      // console.log('key='+key);    //prints: 'key=undefined'

      angular.forEach($scope.headers, function(target) {
        // console.log('key='+key);
        if (target.data == key) {
          if (target.visible) {
            return target.order;
          }
        }
      });
      return -1;
    }

    function rowClicked(target) {
      console.log(event);
      // console.log('Dataset: ' + target.dataSource);
      // console.log(target);

      for (var key in target) {
        if (target.hasOwnProperty(key)) {
          console.log(key + ' -> ' + target[key]);
        }
      }
    }

    function decorateSiblings(target) {
      // console.log('data row touched, sending emission.');
      $scope.$emit('currentDatatableTarget', target);
    }

    function clearSiblings(target) {
      // console.log('datarow cleared, sending all clear.');
      $scope.$emit('clearDatatableTarget', target);
    }

    function updateView(data) {
      // console.log('DatatableView Updated with new data:', data);

      // ngTable

      $scope.dataTable = new ngTableParams({
        page: 1,
        count: 10
      }, {
        total: $scope.tabledata.length,
        counts: [10, 25, 50, 100, 250],
        defaultSort: 'asc',
        getData: function($defer, params) {
          $scope.data = params.sorting() ? $filter('orderBy')($scope.tabledata, params.orderBy()) : $scope.tabledata;
          $scope.data = params.filter() ? $filter('filter')(data, params.filter()) : data;
          $scope.data = data.slice((params.page() - 1) * params.count(), params.page() * params.count());
          $defer.resolve($scope.data);
          // console.log($scope.data);
        }
      });

      // ngTable Demo

      // this.tableParams = new ngTableParams({}, {
      //   getData: function (params) {
      //     return AnalysisDataFactory.query({
      //       page: params.page(),
      //       per_page: params.count(),

      //       state: 'all',
      //       username: 'taoteg',
      //       repo: 'estes'
      //     }, function (data, headersGetter) {
      //       var headers = headersGetter(),
      //         pages = headers['link'].split(', '),
      //         totalPages = 1;

      //       // get total pages count
      //       angular.forEach(pages, function (page) {
      //         var parts = page.split(' rel=');
      //         if (parts[1] == '"last"') {
      //           totalPages = parseInt(parts[0].match(/page=(\d+)/)[1], 10);
      //         }
      //         if (totalPages == 1 && parts[1] == '"prev"') { // if last page
      //           totalPages = parseInt(parts[0].match(/page=(\d+)/)[1], 10) + 1;
      //         }
      //       });
      //       params.total(totalPages * params.count());
      //       console.log(data);
      //       return data;
      //     }).$promise;
      //   }
      // });

    }
  }
})();