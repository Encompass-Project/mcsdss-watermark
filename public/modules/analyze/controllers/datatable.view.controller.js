(function() {
  'use strict';

  angular
    .module('analyze')
    .controller('DatatableViewController', DatatableViewController);

  DatatableViewController.$inject = ['$scope', 'Authentication', '$filter', 'ngTableParams', 'AnalysisDataFactory', 'datagridConfig'];

  function DatatableViewController($scope, Authentication, $filter, ngTableParams, AnalysisDataFactory, datagridConfig) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    // console.log(datagridConfig);

    // Private members.
    // $scope.headerdata = [];
    // $scope.tabledata = [];
    $scope.suf01 = 0;
    $scope.suf02 = 0;
    $scope.suf03 = 0;
    $scope.muf = 0;

    $scope.$on('analysisDataLoaded', function(event, args) {
      console.log(args);
      $scope.datagridConfig = datagridConfig;

      // NOTE: Table works with either config object or args.
      // Data strux is correct already due to whatever altered it in route.
      // Need to do the same for the graphdata config object.

      $scope.tabledata = args;  // Using args.
      // $scope.tabledata = $scope.datagridConfig.datasources.tabledata.datum;  // Using config object.
      // console.log($scope.tabledata);
      $scope.updateView($scope.tabledata);
    });

    function headerFilter(target) {
      return target.visible;
    }

    function datasetOrder(key) {
      // console.log(key);
      // console.log('key='+key);    //prints: 'key=undefined'

      angular.forEach($scope.headers, function(target) {
        // console.log('key='+key);
        if (target.data === key) {
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
      // console.log('DatatableView updating with new data...');
      // console.log(data);

      // console.log(data.datasources);
      // console.log(data.datasources.tabledata);
      // console.log(data.datasources.tabledata.datum);

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

      // ngTable Demo for Ref.

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

    // Expose public API.
    $scope.headerFilter = headerFilter;
    $scope.datasetOrder = datasetOrder;
    $scope.rowClicked = rowClicked;
    $scope.decorateSiblings = decorateSiblings;
    $scope.clearSiblings = clearSiblings;
    $scope.updateView = updateView;

  }
})();