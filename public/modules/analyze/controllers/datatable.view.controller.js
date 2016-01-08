(function() {
  'use strict';

  angular
    .module('analyze')
    .controller('DatatableViewController', DatatableViewController);

  DatatableViewController.$inject = ['$scope', 'Authentication', '$filter', 'ngTableParams', 'AnalysisDataFactory', 'datagridConfig', 'graphConfig'];

  function DatatableViewController($scope, Authentication, $filter, ngTableParams, AnalysisDataFactory, datagridConfig, graphConfig) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    // Public methods.
    $scope.headerFilter = headerFilter;
    $scope.datasetOrder = datasetOrder;
    $scope.rowClicked = rowClicked;
    $scope.decorateSiblings = decorateSiblings;
    $scope.clearSiblings = clearSiblings;
    $scope.updateView = updateView;
    // console.log('datagridConfig: ', datagridConfig);

    // Private members.
    // $scope.headerdata = [];
    // $scope.tabledata = [];
    $scope.suf01 = 0;
    $scope.suf02 = 0;
    $scope.suf03 = 0;
    $scope.muf = 0;

    $scope.$on('analysisDataLoaded', function(event, args) {
      // console.log('analysisData event received by DatatableViewCTRL.');
      // console.log('args: ', args);

      // console.log('datagridConfig: ', datagridConfig);
      // console.log('graphConfig: ', graphConfig);
      // console.log('datagridConfig.tabledata.datum: ', datagridConfig.datasources.tabledata.datum);
      // console.log('graphConfig.graphdata.datum: ', graphConfig.datasources.graphdata.datum);

      $scope.datagridConfig = datagridConfig;
      // console.log('$scope.datagridConfig: ', $scope.datagridConfig);
      // console.log('$scope.datagridConfig: ', $scope.datagridConfig.datasources.tabledata.datum);

      // NOTE: Table works with either config object or args.
      // Data strux is correct already due to whatever altered it in route.
      // Need to do the same for the graphdata config object.

      // $scope.tabledata = args;  // Using args.
      // console.log('$scope.tabledata: ', $scope.tabledata);

      $scope.tabledata = $scope.datagridConfig.datasources.tabledata.datum;  // Using config object.
      // console.log('$scope.tabledata: ', $scope.tabledata);

      $scope.updateView($scope.tabledata);
    });

    // Filter Weighting.
    $scope.$on('newSUF1Weight', function(event, args) {
      console.log('newSUF1Weight event received by DatatableViewCTRL.', args);
      // Update run SUF weight.
      // Eval new MUF and update filters based on new weights.
    });

    $scope.$on('newSUF2Weight', function(event, args) {
      console.log('newSUF2Weight event received by DatatableViewCTRL.', args);
      // Update run SUF weight.
      // Eval new MUF and update filters based on new weights.
    });

    $scope.$on('newSUF3Weight', function(event, args) {
      console.log('newSUF3Weight event received by DatatableViewCTRL.', args);
      // Update run SUF weight.
      // Eval new MUF and update filters based on new weights.
    });

    $scope.$on('newMUFWeight', function(event, args) {
      console.log('newMUFWeight event received by DatatableViewCTRL.', args);
      // No changes to run SUF weight.
      // Eval new MUF and update filters based on new weights.
    });

    // Private methods.

    function headerFilter(target) {
      return target.visible;
    }

    function datasetOrder(key) {
      // console.log(key);
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
      // console.log('updateView data: ', data);
      // console.log(data.datasources);
      // console.log(data.datasources.tabledata);
      // console.log(data.datasources.tabledata.datum);

      // ngTable

      $scope.dataTable = new ngTableParams({
        page: 1,
        count: 10
      }, {
        filterDelay: 0,
        total: $scope.tabledata.length,
        counts: [10, 50, 100, 250, 500, 1000],
        defaultSort: 'asc',
        data: this.getData,
        getData: function($defer, params) {
          $scope.data = params.sorting() ? $filter('orderBy')($scope.tabledata, params.orderBy()) : $scope.tabledata;
          $scope.data = params.filter() ? $filter('filter')(data, params.filter()) : data;
          $scope.data = data.slice((params.page() - 1) * params.count(), params.page() * params.count());
          $defer.resolve($scope.data);

          // Data we want to display is as follows:
          // col 1: datasource
          // col 2: value_O/M_
          // col 3: suf (value * weight)
          // col 4: value_O/M_
          // col 5: suf (value * weight)
          // col 6: value_O/M_
          // col 7: suf (value * weight)
          // col 8: muf (suf + suf + suf)

          // console.log($scope.data);
          // console.log($scope.data[0]);      // data header row. All subsequent iterations are data runs.
          // console.log($scope.data[0][0]);   // datasource
          // console.log($scope.data[0][1]);   // value_O_wells
          // console.log($scope.data[0][2]);   // value_M_wells
          // console.log($scope.data[0][3]);   // units_wells
          // console.log($scope.data[0][4]);   // value_O_heads
          // console.log($scope.data[0][5]);   // value_M_heads
          // console.log($scope.data[0][6]);   // units_heads
          // console.log($scope.data[0][7]);   // value_O_drains
          // console.log($scope.data[0][8]);   // value_M_drains
          // console.log($scope.data[0][9]);   // units_drains
          // console.log($scope.data[0][10]);  // Zone_1
          // console.log($scope.data[0][11]);  // Zone_2
          // console.log($scope.data[0][12]);  // Zone_3
          // console.log($scope.data[0][13]);  // Zone_4
          // console.log($scope.data[0][14]);  // Zone_5
          // console.log($scope.data[0][15]);  // Zone_6
          // console.log($scope.data[0][16]);  // Zone_7
          // console.log($scope.data[0][17]);  // Zone_8
          // console.log($scope.data[0][18]);  // Zone_9
          // console.log($scope.data[0][19]);  // Zone_10
          // console.log($scope.data[0][20]);  // Zone_11
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

  }
})();