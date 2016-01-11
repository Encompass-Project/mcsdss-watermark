(function() {
  'use strict';

  angular
    .module('analyze')
    .controller('DatatableViewController', DatatableViewController);

  DatatableViewController.$inject = ['$scope', 'Authentication', '$filter', 'ngTableParams', 'AnalysisDataFactory', 'datagridConfig', 'graphConfig'];

  function DatatableViewController($scope, Authentication, $filter, ngTableParams, AnalysisDataFactory, datagridConfig, graphConfig) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    // Private methods.
    $scope.headerFilter = headerFilter;
    $scope.datasetOrder = datasetOrder;
    $scope.rowClicked = rowClicked;
    $scope.decorateSiblings = decorateSiblings;
    $scope.clearSiblings = clearSiblings;
    $scope.updateView = updateView;
    $scope.updateSelectedDataset = updateSelectedDataset;
    $scope.updateDimensionWeight = updateDimensionWeight;
    $scope.updateCurrentDatasetValues = updateCurrentDatasetValues;
    $scope.updateDimensionScore = updateDimensionScore;
    $scope.updateUtilityScores = updateUtilityScores;

    // Private members.
    $scope.weightedDataset = 'Original';
    $scope.currentDimension = 'All';
    $scope.suf01Weight = 50;
    $scope.suf02Weight = 50;
    $scope.suf03Weight = 50;
    $scope.mufRange = [0,100];
    $scope.suf01 = 0;
    $scope.suf02 = 0;
    $scope.suf03 = 0;
    $scope.muf = 0;

    // console.log('datagridConfig: ', datagridConfig);

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

    $scope.$on('newDatasetSelected', function(event, args) {
      console.log('Selected Dataset Updated.');
      console.log('Current Selected Dataset: ', args);
      updateSelectedDataset(args);
    });

    // Filter Weighting.
    $scope.$on('newSUF1Weight', function(event, args) {
      console.log('newSUF1Weight event received by DatatableViewCTRL.', args);
      $scope.suf01Weight = args;
      // Update run SUF weight.
      // Eval new MUF and update filters based on new weights.
      updateDimensionWeight('SUF1', args);
    });

    $scope.$on('newSUF2Weight', function(event, args) {
      console.log('newSUF2Weight event received by DatatableViewCTRL.', args);
      $scope.suf02Weight = args;
      // Update run SUF weight.
      // Eval new MUF and update filters based on new weights.
      updateDimensionWeight('SUF2', args);
    });

    $scope.$on('newSUF3Weight', function(event, args) {
      console.log('newSUF3Weight event received by DatatableViewCTRL.', args);
      $scope.suf03Weight = args;
      // Update run SUF weight.
      // Eval new MUF and update filters based on new weights.
      updateDimensionWeight('SUF3', args);
    });

    $scope.$on('newMUFWeight', function(event, args) {
      console.log('newMUFWeight event received by DatatableViewCTRL.', args);
      // No changes to run SUF weight.
      // Eval new MUF and update filters based on new weights.
      $scope.updateUtilityScores();
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

    // Need to calculate initial SUF/MUF values based on defaults.

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
          // col 3: measure
          // col 4: suf (value * weight)
          // col 5: value_O/M_
          // col 6: measure
          // col 7: suf (value * weight)
          // col 8: value_O/M_
          // col 9: measure
          // col 10: suf (value * weight)
          // col 11: muf (suf + suf + suf)

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
    }

    // TODO:
    // Need to trigger update on all dimensions and MUF when changed.
    // Need to normalize data ranges within set for SUF and MUF calculations.
    function updateSelectedDataset(target) {
      console.log('New Dataset for Weighitng: ', target);
      $scope.weightedDataset = target;

      $scope.currentDimension = 'All';
      // Call update on dimensions.
      // $scope.tabledata.forEach(function(d, i) {
      //   $scope.updateCurrentDatasetValues(d);
      // });
    }

    function updateDimensionWeight(dimension, dimensionWeight) {
      console.log('Datable updated with new Dimension & Value: ', dimension, dimensionWeight);
      console.log('Current Dataset:', $scope.weightedDataset);

      $scope.currentDimension = dimension;
      console.log($scope.currentDimension);

      // switch ($scope.currentDimension) {
      //   case 'All':
      //     // console.log('Current Dimension: ', $scope.currentDimension);
      //     break;
      //   case 'SUF1':
      //     // console.log('Current Dimension: ', $scope.currentDimension);
      //     // generate the new SUF value and apply to table element.
      //     break;
      //   case 'SUF2':
      //     // console.log('Current Dimension: ', $scope.currentDimension);
      //     // generate the new SUF value and apply to table element.
      //     break;
      //   case 'SUF3':
      //     // console.log('Current Dimension: ', $scope.currentDimension);
      //     // generate the new SUF value and apply to table element.
      //     break;
      // }

      $scope.tabledata.forEach(function(d, i) {
        $scope.updateCurrentDatasetValues(d);
      });

      $scope.updateUtilityScores();
    }

    // TODO:
    // Can this be offloaded to a web worker?
    // At least do this async so UI doesn't frezze while crunching new values.

    function updateCurrentDatasetValues(d) {
      if ($scope.weightedDataset == 'Original') {
        // Update original dataset dimension.
        console.log('Original Dataset');
        console.log('Dataset: ',d[0],d[1],d[3],d[4],d[6],d[7],d[9]);
        updateDimensionScore(d);
      } else if ($scope.weightedDataset == 'Modified') {
        // Update modified dataset dimension.
        console.log('Modified Dataset');
        console.log('Dataset: ',d[0],d[2],d[3],d[5],d[6],d[8],d[9]);
        updateDimensionScore(d);
      }
    }

    // TODO:
    // Currently applying a global value to all runs.
    // Need to ensure this is populating with a unique value per run.
    // use of $scope.suf01 as a binding element *should* work BUT...
    // need to review how angular binds to this and updates.

    function updateDimensionScore(d) {
      switch ($scope.currentDimension) {
        case 'SUF1':
          $scope.currentDimension = 'SUF1';
          console.log('Current Dimension: ', $scope.currentDimension);
          // generate the new SUF value and apply to table element.
          console.log(d[1], $scope.suf01Weight);
          var newDimensionValue = d[1] * $scope.suf01Weight;
          console.log(newDimensionValue);
          $scope.suf01 = newDimensionValue;
          $scope.$apply();
          break;
        case 'SUF2':
          $scope.currentDimension = 'SUF2';
          console.log('Current Dimension: ', $scope.currentDimension);
          // generate the new SUF value and apply to table element.
          console.log(d[4], $scope.suf02Weight);
          var newDimensionValue = d[4] * $scope.suf02Weight;
          console.log(newDimensionValue);
          $scope.suf02 = newDimensionValue;
          $scope.$apply();
          break;
        case 'SUF3':
          $scope.currentDimension = 'SUF3';
          console.log('Current Dimension: ', $scope.currentDimension);
          // generate the new SUF value and apply to table element.
          console.log(d[7], $scope.suf03Weight);
          var newDimensionValue = d[7] * $scope.suf03Weight;
          console.log(newDimensionValue);
          $scope.suf03 = newDimensionValue;
          $scope.$apply();
          break;
      }
    }

    // TODO:
    // Need to ensure that runs with muf value below threshold/outside range get removed from table display.
    //
    // Also in D3:
    // Need to notify graph of runs that should be updated in view.
    // If still valid - no change to display.
    // If out of range - reduce alpha to almost invisible and remove listeners.
    // If returning to range - increase alpha to norml and add listener back to element.

    function updateUtilityScores() {
      console.log('Datatable updating MUF Scores.');
      var currentMuf = $scope.suf01 + $scope.suf02 + $scope.suf03;
      $scope.muf = currentMuf;
    }

    // TODO:
    // Need to add a spinner to datatable view when it is calculating new SUF/MUF scores.
    // Could display programmaticlly in update methods or use boolean and ng-if in view.
  }
})();