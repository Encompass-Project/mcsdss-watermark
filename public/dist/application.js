'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mcsdss';
	var applicationModuleDependenciesCustom = ['mcsdss.directives', 'mcsdss.providers'];
	var applicationModuleDependenciesVendor = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils', 'nemLogging', 'ngPapaParse', 'ngTable', 'angularFileUpload']; /* 'leaflet-directive', 'ngFileUpload' */
	var applicationModuleDependencies = applicationModuleDependenciesVendor.concat(applicationModuleDependenciesCustom);
	// console.log(applicationModuleDependencies);

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleDependencies: applicationModuleDependencies,
		registerModule: registerModule
	};
})();
'use strict';

// Get listing of registered modules.
(function (orig) {
    angular.modules = [];
    angular.module = function () {
        if (arguments.length > 1) {
            angular.modules.push(arguments[0]);
        }
        return orig.apply(null, arguments);
    };
})(angular.module);

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',	function ($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function () {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

// console.log(angular.modules);   // This only lists the main app module at load. You can find all registered modules in the browser console at: window.angular.modules
(function() {
  'use strict';

  // Use Applicaion configuration module to register a new module
  ApplicationConfiguration.registerModule('analyze');
})();
(function() {
  'use strict';

  // Use Applicaion configuration module to register a new module
  ApplicationConfiguration.registerModule('core');
})();
(function() {
  'use strict';

  // Use Applicaion configuration module to register a new module
  ApplicationConfiguration.registerModule('dashboard');
})();
(function() {
  'use strict';

  // Use applicaion configuration module to register a new module
  ApplicationConfiguration.registerModule('datasets');
})();
(function() {
  'use strict';

  // Use applicaion configuration module to register a new module
  ApplicationConfiguration.registerModule('mcsdss.directives');
})();
(function() {
  'use strict';

  // Use Applicaion configuration module to register a new module
  ApplicationConfiguration.registerModule('documentation');
})();
(function() {
  'use strict';

  // Use applicaion configuration module to register a new module
  ApplicationConfiguration.registerModule('formulations');
})();
(function() {
  'use strict';

  // Use Applicaion configuration module to register a new module
  ApplicationConfiguration.registerModule('information');
})();
(function() {
  'use strict';

  // Use applicaion configuration module to register a new module
  ApplicationConfiguration.registerModule('models');
})();
(function() {
  'use strict';

  // Use applicaion configuration module to register a new module
  ApplicationConfiguration.registerModule('mcsdss.providers');
})();
(function() {
  'use strict';

  // Use applicaion configuration module to register a new module
  ApplicationConfiguration.registerModule('publications');
})();
(function() {
  'use strict';

  // Use Applicaion configuration module to register a new module
  ApplicationConfiguration.registerModule('users');
})();
(function() {
  'use strict';

  angular
    .module('analyze')
    .config(DashboardRoutes);

  DashboardRoutes.$inject = ['$stateProvider'];

  // NOTE: Factories do not need to be injected. They are already available through the mcsdss.providers module across the app.
  function DashboardRoutes($stateProvider) {

    // Define states.
    var analyze_state = {
      abstract: true,
      url: '', // /analyze
      templateUrl: 'modules/analyze/views/analyze.client.view.html',
      controller: 'AnalyzeViewController',
      controllerAs: 'analyze',
      data: {
        title: 'Analyze'
      },
      resolve: {
        analysisData: function(FormulationRetrieval) {
          return FormulationRetrieval.getFormulation('./data/formulations/bs.formulation.json'); // Replace with formulation id by user.
        },
        analysisConfig: function(FormulationRetrieval, analysisData) {
          return FormulationRetrieval.getAnalysisConfig(analysisData);
        },
        maufConfig: function(FormulationRetrieval, analysisData) {
          return FormulationRetrieval.getMaufConfig(analysisData);
        },
        datagridConfig: function(FormulationRetrieval, analysisData) {
          return FormulationRetrieval.getDatagridConfig(analysisData);
        },
        graphConfig: function(FormulationRetrieval, analysisData) {
          return FormulationRetrieval.getGraphConfig(analysisData);
        },
        mapConfig: function(FormulationRetrieval, analysisData) {
          return FormulationRetrieval.getMapConfig(analysisData);
        }
      }
    };

    var analyze_layout_state = {
      abstract: false,
      url: '/analyze',
      views: {
        'graph': {
          templateUrl: 'modules/analyze/views/analyze.graph.client.view.html',
          controller: 'GraphViewController'
        },
        'map': {
          templateUrl: 'modules/analyze/views/analyze.map.client.view.html',
          controller: 'MapViewController'
        },
        'filters': {
          templateUrl: 'modules/analyze/views/analyze.filters.client.view.html',
          controller: 'FiltersViewController',
          controllerAs: 'filters'
        },
        'datatable': {
          templateUrl: 'modules/analyze/views/analyze.datatable.client.view.html',
          controller: 'DatatableViewController',
          controllerAs: 'datatable'
        }
      }
    };

    // Populate provider.
    $stateProvider
      .state('analyze', analyze_state)
      .state('analyze.layout', analyze_layout_state);
  }
})();
(function() {
  'use strict';

  angular
    .module('analyze')
    .controller('AnalyzeViewController', AnalyzeViewController);

  AnalyzeViewController.$inject = ['$rootScope', '$scope', '$state', '$location', 'Authentication', 'httpq', 'analysisData', 'analysisConfig']; //, 'maufConfig', 'datagridConfig', 'graphConfig', 'mapConfig'];

  function AnalyzeViewController($rootScope, $scope, $state, $location, Authentication, $httpq, analysisData, analysisConfig) { //, maufConfig, datagridConfig, graphConfig, mapConfig) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.currentRoute = 'Analyze';

    // Data objects returned from Service. All work as expected immediately.

    // console.log(analysisData);
    // console.log(analysisConfig);
    // console.log(maufConfig);
    // console.log(datagridConfig);
    // console.log(graphConfig);
    // console.log(mapConfig);

    // Data in the config object is what is expected.
    // Somehow the config object is getting parsed and new properties are being added.
    // Not sure how - results from formulationRetrievalService are identical, even after parsing.
    // Somehow the graph and the table load the exact same data in the Service, it gets parsed.
    // Somewhere between parsing it and loading it into the  config objects, the table data gets reparsed to include extra attrs.
    // These are what is missing from the graph data and causing it to fail when I try and populate with it.
    // This is in addition to the fact that the promises are being resolved before the data is fully loaded and therefore not binding correctly.
    // The data binding seems to be a result of a page reload/refresh versus a route resolve (on initial nav to view).
    // I may need to trigger state resolves to update all views accordingly on state changes.
    // Note: WIll need a mechanism to do this without actually doing a reload so the updated state can be retained and propgated to child views.

    $scope.$on('$stateChangeSuccess', function() {
      var d = new Date();

      $scope.analysisData = analysisData;
      $scope.analysisConfig = analysisConfig;

      var t = d.getTime();
      // console.log('$scope.analysisData: ', d, t, $scope.analysisData);   // debug

      // If config objects are available directly via resolved resources, no need to pass around data, just trigger update sync.
      // Currently using the broadcast to ensure graph populates correctly.

      $scope.$broadcast('analysisDataLoaded', $scope.analysisData.datagridConfig.datasources.tabledata.datum);
      // $scope.$broadcast('analysisDataLoaded', {});
    });

    // Pubsub between Filters and Datatable.
    $scope.$on('CurrentDatasetUpdated', function(event, args) {
      $rootScope.$broadcast('newDatasetSelected', args);
    });

    // Need to rearchitect these once a better filter display and generalized method have been implemented.
    // Event should indicate the dimension being changed so it is generalized.
    $scope.$on('SUFWeightDim1Update', function(event, args) {
      // console.log('SUFWeightDim1Update event received by AnalyzeViewCTRL.');
      $rootScope.$broadcast('newSUF1Weight', args);
    });

    $scope.$on('SUFWeightDim2Update', function(event, args) {
      // console.log('SUFWeightDim2Update event received by AnalyzeViewCTRL.');
      $rootScope.$broadcast('newSUF2Weight', args);
    });

    $scope.$on('SUFWeightDim3Update', function(event, args) {
      // console.log('SUFWeightDim3Update event received by AnalyzeViewCTRL.');
      $rootScope.$broadcast('newSUF3Weight', args);
    });

    $scope.$on('MUFWeightUpdate', function(event, args) {
      // console.log('MUFWeightUpdate event received by AnalyzeViewCTRL.');
      $rootScope.$broadcast('newMUFWeight', args);
    });

    // PubSub between Datatable and Graph.
    $scope.$on('currentDatatableTarget', function(event, args) {
      $rootScope.$broadcast('newDatatableTarget', args[0]);       // console.log('you touched the datatable at row: ' + args[0]);
    });

    $scope.$on('clearDatatableTarget', function(event, args) {
      $rootScope.$broadcast('removeDatatableTarget', args[0]);    // console.log('you stopped touching the datatable row: ' + args[0]);
    });

    // PubSub between Graph and Map.
    $scope.$on('currentGraphTarget', function(event, args) {
      $rootScope.$broadcast('addMapTarget', args);                // console.log('you touched the graph at record: ' + args);
    });

    $scope.$on('clearGraphTarget', function(event, args) {
      $rootScope.$broadcast('removeMapTarget', args);             // console.log('you stopped touching the graph record: ' + args[0]);
    });

    // Pubsub between Datatable and Map.
    // NOTE: There is no pubsub between Datatable and Map due to incongruous linkages (at this time).
  }
})();

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
(function() {
    'use strict';

    angular
        .module('analyze')
        .controller('FiltersViewController', FiltersViewController);

    FiltersViewController.$inject = ['$scope', 'Authentication', 'maufConfig']; // , 'BsDropdown'

    function FiltersViewController($scope, Authentication, maufConfig) { // BsDropdown
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.updateView = updateView;
        $scope.setCurrentDataset = setCurrentDataset;
        // $scope.outputUpdate = outputUpdate;
        $scope.suf1UpdateDisplay = suf1UpdateDisplay;
        $scope.suf2UpdateDisplay = suf2UpdateDisplay;
        $scope.suf3UpdateDisplay = suf3UpdateDisplay;
        $scope.mufUpdateDisplay = mufUpdateDisplay;
        $scope.suf1EmitChange = suf1EmitChange;
        $scope.suf2EmitChange = suf2EmitChange;
        $scope.suf3EmitChange = suf3EmitChange;
        $scope.mufEmitChange = mufEmitChange;

        $scope.$on('analysisDataLoaded', function (event, args) {
            // console.log('analysisData event received by FiltersViewCTRL. Using the following config data: ');
            // console.log(args);

            $scope.maufConfig = maufConfig;
            // console.log($scope.maufConfig);

            // $scope.updateView(args);
            // $scope.updateView($scope.maufConfig);
        });

        function updateView(data) {
            // console.log('FiltersView updating with new data:' , data);
        }

        // Weighting filters interaction.
        $scope.statuses = [{
            id: 1,
            name: "Original"
        }, {
            id: 2,
            name: "Modified"
        }];

        $scope.selected_status = 1;

        // document.getElementById('current-dataset-toggle').onchange = function() { setCurrentDataset(this.value) };

        function setCurrentDataset() {
            console.log('Dataset changed to: ', $scope.selected_status);
            $scope.$emit('CurrentDatasetUpdated', $scope.selected_status);
        }

        // document.getElementById('suf-weight-dim1').oninput = function() { outputUpdate(this.value) };

        // function outputUpdate(weight) {
        //     console.log('The value of the input field was changed to:', weight);
        //     document.getElementById('suf-weight-dim1-value').value = weight;
        // }

        // This is the hardcoded hack to filter the display data for the demos.
        // Need to convert this into a generalized method for handling all the range inputs uniformly here.
        // Refactor - No need for unique method per dimension.

        document.getElementById('suf-weight-dim1').oninput = function() { suf1UpdateDisplay(this.value) };
        document.getElementById('suf-weight-dim2').oninput = function() { suf2UpdateDisplay(this.value) };
        document.getElementById('suf-weight-dim3').oninput = function() { suf3UpdateDisplay(this.value) };
        document.getElementById('muf-weight').oninput = function() { mufUpdateDisplay(this.value) };

        document.getElementById('suf-weight-dim1').onchange = function() { suf1EmitChange(this.value) };
        document.getElementById('suf-weight-dim2').onchange = function() { suf2EmitChange(this.value) };
        document.getElementById('suf-weight-dim3').onchange = function() { suf3EmitChange(this.value) };
        document.getElementById('muf-weight').onchange = function() { mufEmitChange(this.value) };

        function suf1UpdateDisplay(weight) {
            document.getElementById('suf-weight-dim1-value').value = weight;
        }

        function suf2UpdateDisplay(weight) {
            document.getElementById('suf-weight-dim2-value').value = weight;
        }

        function suf3UpdateDisplay(weight) {
            document.getElementById('suf-weight-dim3-value').value = weight;
        }

        function mufUpdateDisplay(weight) {
            if (weight == 0) {
                document.getElementById('muf-weight-value').value = weight + ' (minimal utility)';
            } else if (weight == 1) {
                document.getElementById('muf-weight-value').value = weight + ' (maximal utility)';
            } else {
                document.getElementById('muf-weight-value').value = weight;
            }
        }

        function suf1EmitChange(weight) {
            $scope.$emit('SUFWeightDim1Update', weight);
            // console.log('The value of the suf 1 weight was changed to:', weight);
        }

        function suf2EmitChange(weight) {
            $scope.$emit('SUFWeightDim2Update', weight);
            // console.log('The value of the suf 2 weight was changed to:', weight);
        }

        function suf3EmitChange(weight) {
            $scope.$emit('SUFWeightDim3Update', weight);
            // console.log('The value of the suf 3 weight was changed to:', weight);
        }

        function mufEmitChange(weight) {
            $scope.$emit('MUFWeightUpdate', weight);
            // console.log('The value of the muf weight was changed to:', weight);
        }

    }
})();
(function() {
  'use strict';

  angular
    .module('analyze')
    .controller('GraphViewController', GraphViewController);

  GraphViewController.$inject = ['$rootScope', '$scope', '$state', '$location', 'Authentication', 'graphConfig'];

function GraphViewController($rootScope, $scope, $state, $location, Authentication, graphConfig) {
  // This provides Authentication context.
  $scope.authentication = Authentication;
  // console.log(graphConfig);
  $scope.graphTitle = 'Identifying Desired Future Conditions (DFCs)';

  $scope.$on('analysisDataLoaded', function(event, args) {
    var d = new Date();

    // console.log('analysisData event received by GraphViewCTRL.');
    // console.log(args);

    // console.log('graphConfig: ', graphConfig);
    $scope.graphConfig = graphConfig;
    // console.log('$scope.graphConfig: ', $scope.graphConfig);

    /*********************/

    // NOTE: Using args works but using the configObject does not. This is due to the altered data structure the tabledata has when it makes it to the controller.
    // If I can determine where this is being introduced I can ensure the same alterations happen uniformly to the config objects.

    var t = d.getTime();
    $scope.graphdata = args;  // Using args.
    // console.log('$scope.graphdata: ', d, t, $scope.graphdata);

    var t = d.getTime();
    $scope.graphdata2 = $scope.graphConfig.datasources.graphdata.datum;   // Using config object.
    // console.log('$scope.graphdata2 :', d, t, $scope.graphdata2);

    /*********************/

    $scope.updateView($scope.graphdata);
    // $scope.updateView($scope.graphdata2);
  });

  $scope.updateView = function(data) {
    var d = new Date();
    var t = d.getTime();
    // console.log('updateView data: ', d, t, data);
    $scope.visualization(data);
  };

  // WATERMARK.
  $scope.visualization = function(data) {
    // console.log(data);
    // console.log(data[0]);

    // data sources.
    // var graph_dataSource = '../../../../data/Watermark_Master_Total_Wells_Heads_Zones_optimized.csv';
    var graph_dataSource = data; // Uses async data from promise via http.
    var aquiferContinuum_dataSource = '../../../../data/AquiferYield_ContinuumData_BartonSprings.csv';

    // var graph_dataSource = data.datasources.graphData.datum;
    // var graph_dataSource = graphConfig.datasources.graphData.datum;
    // var aquiferContinuum_dataSource = data.datasources.graphContext.datum;

    // set graph dimensions.
    var graphPanel = document.getElementById('panel-pm');
    var graphPanelWidth = graphPanel.offsetWidth;
    var graphPanelHeight = graphPanel.offsetHeight;
    // console.log(graphPanelWidth, graphPanelHeight);

    // setup scales for graph layout.
    var graphWidthScale = 0.95; //.65;
    var graphHeightScale = 0.91; //.85;
    var width = graphPanelWidth * graphWidthScale;
    var height = graphPanelHeight * graphHeightScale;

    // console.log('graph dimensions are: ' + width, height);

    // MODULE private methods.
    function drawGraph(graphData) {

      var dotRadius = 2;
      var dotStrokeWidth = 1;
      var dotStrokeColor = '#111'; // 333F48
      var dotColorOriginal = '#CD6AD4';
      var dotColorModified = '#8AE5F2';
      var dotActiveRadius = 13;
      var dotColorActive = 'rgba(233,174,12,0.7)'; //'#EC9688' #D2AF00;
      var dotActiveStrokeWidth = 7;
      var dotActiveStrokeColor = 'rgba(0,0,0,0.5)'; //'#E85840'; '#D28912';

      var correlateRuns = [];
      var correlateRunsTextColor = '#ffffff';

      var continuumStrokeWidth = 1;
      var continuumStrokeColor = 'rgba(113,178,201,0.7)';
      var continuumTextFill = '#ddd';

      var xScaleDomain_Lower = Math.pow(10, 9); // 0, 1000000000, Math.pow(10, 9)
      var xScaleDomain_Upper = Math.pow(10, 9.85); // 5250000000, 5500000000, Math.pow(10, 9.7)
      var yScaleDomain_Lower = 770;
      var yScaleDomain_Upper = 792;

      // Static Values.
      var animationDuration = 150;
      var tooltipPosX = 10; // width * 1.12; // dynamic values for moving tooltip.
      var tooltipPosY = 30; // height * 1.3; // dynamic values for moving tooltip.
      // Dynamic Values.
      // var tooltipPosXadjust = 5;
      // var tooltipPosYadjust = 15;
      // var tooltipPosXoffset = 0.5;
      // var tooltipPosYoffset = 0.5;

      var cfsDenominator = 315360000; // 315,360,000 seconds
      var decimalLimit = 5;

      /*
       * value accessor - returns the value to encode for a given data object.
       * scale - maps value to a visual display encoding, such as a pixel position.
       * map function - maps from data value to display value
       * axis - sets up axis
       */

      // setup scales for graph.
      var xScale = d3.scale.linear().range([0, width]); // value -> display
      var xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(10, 'e'); //.tickSubdivide(3).tickSize(20, 10, 0);

      var yScale = d3.scale.linear().range([height, 0]); // value -> display
      var yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(10, 's');

      // setup x original
      var xValue_O = function(d) {
          return d.value_O;
          // var xVal = d.value_O;
          // if (xVal === 'NaN') {
          //     console.log('This datum did not process:', xVal);
          // } else {
          //     return xVal;
          // }
        }, // data -> value
        xMap_O = function(d) {
          return xScale(xValue_O(d));
          // var xMap = xScale(xValue_O(d));
          // if (xMap === 'NaN') {
          //     console.log('This datum did not process:', xMap);
          // } else {
          //     return xMap;
          // }
        }; // data -> display

      // setup y original
      var yValue_O = function(d) {
          return d.value_O_heads;
        },
        yMap_O = function(d) {
          return yScale(yValue_O(d));
        };

      // setup x modified
      var xValue_M = function(d) {
          return d.value_M;
        },
        xMap_M = function(d) {
          return xScale(xValue_M(d));
        };

      // setup y modified
      var yValue_M = function(d) {
          return d.value_O_heads;
        },
        yMap_M = function(d) {
          return yScale(yValue_M(d));
        };

      // setup x stakeholder
      var xValue_S = function(d) {
          return d.Total_Pumping_Volume;
        },
        xMap_S = function(d) {
          return xScale(xValue_S(d));
        };

      // setup y stakeholder
      var yValue_S = function(d) {
          return d.Average_Total_Storage;
        },
        yMap_S = function(d) {
          return yScale(yValue_S(d));
        };

      // setup x aquifer-continuum
      var xValue_A = function(d) {
          return d.Graph_Value;
        },
        xMap_A = function(d) {
          return xScale(xValue_A(d));
        };

      // setup y aquifer-continuum
      var yValue_A = function(d) {
          return d.Value;
        },
        yMap_A = function(d) {
          return yScale(yValue_A(d));
        };

      // add the graph canvas to the body of the webpage
      //var viewBoxArgs = ['0', '0', width, height];    // ['0', '0', '1152', '540'];
      var canvas = d3.select('#graph').append('svg:svg').attr('id', 'graphSVG').attr('width', width).attr('height', height); //.attr('viewBox', viewBoxArgs).attr('preserveAspectRatio', 'xMinYMid'); // xMinYMid

      d3.selection.prototype.moveToFront = function() {
        return this.each(function() {
          this.parentNode.appendChild(this);
        });
      };

      d3.selection.prototype.moveToBack = function() {
        return this.each(function() {
          var firstChild = this.parentNode.firstChild;
          if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
          }
        });
      };

      var getCorrelatePair = function(d) {
        // console.log(d);

        var currentHash;
        if (d instanceof Object) {
          currentHash = d.dataSource;
        } else {
          currentHash = d;
        }
        // console.log(currentHash);

        var originalNode = d3.selectAll('.dot-O').filter(function(d) {
          return d.dataSource === currentHash;  // ==
        });
        var modifiedNode = d3.selectAll('.dot-M').filter(function(d) {
          return d.dataSource === currentHash;  // ==
        });
        correlateRuns = [originalNode, modifiedNode];
        // console.log(correlateRuns[0][0][0]);
        // console.log(d3.select(correlateRuns[0][0][0]));

        // graphInteractionStart(d);
        graphInteractionStart(correlateRuns);
      };

      var graphInteractionStart = function(data) {
        decorateSiblings(data); // PubSub
        // getCorrelatePair(d);
        highlightPairs();
        displayTooltip(data);
        showData(data);
      };

      var graphInteractionStop = function(data) {
        clearSiblings(data); // PubSub
        // var currentNode = d3.select(this);
        unhighlightPairs();
        hideTooltip();
        clearData();
      };

      // PUB SUB.
      var decorateSiblings = function(d) {
        $scope.$emit('currentGraphTarget', d);
      };
      var clearSiblings = function(d) {
        $scope.$emit('clearGraphTarget', d);
      };

      var highlightPairs = function() {
        // console.log(d3.select(correlateRuns[0][0][0]).attr('cx'), d3.select(correlateRuns[0][0][0]).attr('cy'));
        var originalLabelPosX = d3.select(correlateRuns[0][0][0]).attr('cx');
        var originalLabelPosY = d3.select(correlateRuns[0][0][0]).attr('cy');

        correlateRuns[0].moveToFront();
        correlateRuns[1].moveToFront();

        correlateRuns[0].attr('r', dotActiveRadius).style({
            'stroke-width': dotActiveStrokeWidth,
            'stroke': dotActiveStrokeColor,
            'fill': dotColorActive
          })
          .append('text', 'O')
          .attr('font-size', '3em')
          .attr('color', correlateRunsTextColor)
          .attr('x', 200 + 'px') //originalLabelPosX
          .attr('y', 50 + 'px'); //originalLabelPosY

        correlateRuns[1].attr('r', dotActiveRadius).style({
          'stroke-width': dotActiveStrokeWidth,
          'stroke': dotActiveStrokeColor,
          'fill': dotColorActive
        });
      };

      var unhighlightPairs = function() {
        correlateRuns[0].moveToBack();
        correlateRuns[1].moveToBack();
        correlateRuns[0].attr('r', dotRadius).style({
          'stroke-width': dotStrokeWidth,
          'stroke': dotActiveStrokeColor,
          'fill': dotColorOriginal
        });
        correlateRuns[1].attr('r', dotRadius).style({
          'stroke-width': dotStrokeWidth,
          'stroke': dotActiveStrokeColor,
          'fill': dotColorModified
        });
        correlateRuns = [];
      };

      var correlatePairLabel = function(d) {
        var currentHash = d.dataSource;
        var originalNode = d3.selectAll('.dot-O').filter(function(d) {
          return d.dataSource === currentHash;  // ==
        });
        var modifiedNode = d3.selectAll('.dot-M').filter(function(d) {
          return d.dataSource === currentHash;  // ==
        });
      };

      // add the tooltip area to the webpage
      // var tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);
      var tooltip = d3.select('#watermark').append('div').attr('class', 'watermark-tooltip').style('opacity', 0);

      var displayTooltip = function(data) {
        // var datapath = data[0][0][0]['__data__'];
        var datapath = data[0][0][0].__data__;
        // console.log(datapath);
        // console.log(datapath['dataSource'],datapath['value_O'],datapath['value_M'],datapath['Zone_1']);

        // Tooltip
        tooltip.transition().duration(animationDuration).style('opacity', 1);

        // tooltip.html('<div class="">' + '<div class="pull-left label-total-storage"><strong>Total Storage (Both Runs):</strong></div><div class="pull-right"> ' + datapath['value_O_heads'] + ' ft</div><br/>' + '<div class="pull-left label-original-run"><strong>Original Total Pumping:</strong></div><div class="pull-right"> ' + (datapath['value_O'] / cfsDenominator).toFixed(decimalLimit) + ' cfs</div><br/>' + '<div class="pull-left label-modified-run"><strong>Modified Total Pumping:</strong></div><div class="pull-right"> ' + (datapath['value_M'] / cfsDenominator).toFixed(decimalLimit) + ' cfs</div><br/>' + '<div class="pull-left label-pumping-delta"><strong>Total Pumping Delta:</strong></div><div class="pull-right"> ' + ((datapath['value_O'] / cfsDenominator) - (datapath['value_M'] / cfsDenominator)).toFixed(decimalLimit) + ' cfs</div><br/><br/>' + '<div class="pull-left label-correlate-runs"><strong>Data Source:</strong></div><br/><div class="pull-right label-data-source"> ' + datapath['dataSource'] + '</div><br/><br/>' + '<div class="zone-data"><strong>Pumping by Zones:</strong></div>' + '<div class="pull-left zone-data-label"><strong>Zone 1:</strong></div><div class="pull-right zone-data-value"> ' + datapath['Zone_1'] + '</div><br/>' + '<div class="pull-left zone-data-label"><strong>Zone 2:</strong></div><div class="pull-right zone-data-value"> ' + datapath['Zone_2'] + '</div><br/>' + '<div class="pull-left zone-data-label"><strong>Zone 3:</strong></div><div class="pull-right zone-data-value"> ' + datapath['Zone_3'] + '</div><br/>' + '<div class="pull-left zone-data-label"><strong>Zone 4:</strong></div><div class="pull-right zone-data-value"> ' + datapath['Zone_4'] + '</div><br/>' + '<div class="pull-left zone-data-label"><strong>Zone 5:</strong></div><div class="pull-right zone-data-value"> ' + datapath['Zone_5'] + '</div><br/>' + '<div class="pull-left zone-data-label"><strong>Zone 6:</strong></div><div class="pull-right zone-data-value"> ' + datapath['Zone_6'] + '</div><br/>' + '<div class="pull-left zone-data-label"><strong>Zone 7:</strong></div><div class="pull-right zone-data-value"> ' + datapath['Zone_7'] + '</div><br/>' + '<div class="pull-left zone-data-label"><strong>Zone 8:</strong></div><div class="pull-right zone-data-value"> ' + datapath['Zone_8'] + '</div><br/>' + '<div class="pull-left zone-data-label"><strong>Zone 9:</strong></div><div class="pull-right zone-data-value"> ' + datapath['Zone_9'] + '</div><br/>' + '<div class="pull-left zone-data-label"><strong>Zone 10:</strong></div><div class="pull-right zone-data-value"> ' + datapath['Zone_10'] + '</div><br/>' + '<div class="pull-left zone-data-label"><strong>Zone 11:</strong></div><div class="pull-right zone-data-value"> ' + datapath['Zone_11'] + '</div>' + '</div>')
        tooltip.html('<div class="">' +
            '<div class="pull-left label-total-storage"><strong>Total Storage (Both Runs):</strong></div><div class="pull-right"> ' +
            datapath.value_O_heads + ' ft</div><br/>' +
            '<div class="pull-left label-original-run"><strong>Original Total Pumping:</strong></div><div class="pull-right"> ' +
            (datapath.value_O / cfsDenominator).toFixed(decimalLimit) + ' cfs</div><br/>' +
            '<div class="pull-left label-modified-run"><strong>Modified Total Pumping:</strong></div><div class="pull-right"> ' +
            (datapath.value_M / cfsDenominator).toFixed(decimalLimit) + ' cfs</div><br/>' +
            '<div class="pull-left label-pumping-delta"><strong>Total Pumping Delta:</strong></div><div class="pull-right"> ' +
            ((datapath.value_O / cfsDenominator) - (datapath.value_M / cfsDenominator)).toFixed(decimalLimit) + ' cfs</div><br/><br/>' +
            '<div class="pull-left label-correlate-runs"><strong>Data Source:</strong></div><br/><div class="pull-right label-data-source"> ' +
            datapath.dataSource + '</div><br/><br/>' + '<div class="zone-data"><strong>Pumping by Zones:</strong></div>' +
            '<div class="pull-left zone-data-label"><strong>Zone 1:</strong></div><div class="pull-right zone-data-value"> ' +
            datapath.Zone_1 + '</div><br/>' +
            '<div class="pull-left zone-data-label"><strong>Zone 2:</strong></div><div class="pull-right zone-data-value"> ' +
            datapath.Zone_2 + '</div><br/>' +
            '<div class="pull-left zone-data-label"><strong>Zone 3:</strong></div><div class="pull-right zone-data-value"> ' +
            datapath.Zone_3 + '</div><br/>' +
            '<div class="pull-left zone-data-label"><strong>Zone 4:</strong></div><div class="pull-right zone-data-value"> ' +
            datapath.Zone_4 + '</div><br/>' +
            '<div class="pull-left zone-data-label"><strong>Zone 5:</strong></div><div class="pull-right zone-data-value"> ' +
            datapath.Zone_5 + '</div><br/>' +
            '<div class="pull-left zone-data-label"><strong>Zone 6:</strong></div><div class="pull-right zone-data-value"> ' +
            datapath.Zone_6 + '</div><br/>' +
            '<div class="pull-left zone-data-label"><strong>Zone 7:</strong></div><div class="pull-right zone-data-value"> ' +
            datapath.Zone_7 + '</div><br/>' +
            '<div class="pull-left zone-data-label"><strong>Zone 8:</strong></div><div class="pull-right zone-data-value"> ' +
            datapath.Zone_8 + '</div><br/>' +
            '<div class="pull-left zone-data-label"><strong>Zone 9:</strong></div><div class="pull-right zone-data-value"> ' +
            datapath.Zone_9 + '</div><br/>' +
            '<div class="pull-left zone-data-label"><strong>Zone 10:</strong></div><div class="pull-right zone-data-value"> ' +
            datapath.Zone_10 + '</div><br/>' +
            '<div class="pull-left zone-data-label"><strong>Zone 11:</strong></div><div class="pull-right zone-data-value"> ' +
            datapath.Zone_11 + '</div>' + '</div>')
          .style('right', tooltipPosX + 'px')
          .style('top', tooltipPosY + 'px');
      };

      var hideTooltip = function() {
        tooltip.transition().duration(animationDuration).style('opacity', 0);
      };

      var showData = function(d) {
        // console.log(d);
        // console.log(d[0][0][0]['__data__']['dataSource']);

        var dataSource = d[0][0][0].__data__.dataSource.toString();
        // console.log(dataSource);

        d3.select('#data-source').text(dataSource);
        d3.select('#total-storage-o').text(xValue_O(d[0].datum())); // throwing cx="NaN" error on 463.
        d3.select('#total-pumping-o').text(yValue_O(d[0].datum())); // throwing cy="NaN" error on 464.
        d3.select('#total-storage-m').text(xValue_M(d[0].datum())); // throwing cx="NaN" error on 476.
        d3.select('#total-pumping-m').text(yValue_M(d[0].datum())); // throwing cy="NaN" error on 477.
        d3.select('#zone1').text(d[0].datum().Zone_1);
        d3.select('#zone2').text(d[0].datum().Zone_2);
        d3.select('#zone3').text(d[0].datum().Zone_3);
        d3.select('#zone4').text(d[0].datum().Zone_4);
        d3.select('#zone5').text(d[0].datum().Zone_5);
        d3.select('#zone6').text(d[0].datum().Zone_6);
        d3.select('#zone7').text(d[0].datum().Zone_7);
        d3.select('#zone8').text(d[0].datum().Zone_8);
        d3.select('#zone9').text(d[0].datum().Zone_9);
        d3.select('#zone10').text(d[0].datum().Zone_10);
        d3.select('#zone11').text(d[0].datum().Zone_11);

        // d3.select('#data-source').text(d.dataSource);
        // d3.select('#total-storage-o').text(xValue_O(d));
        // d3.select('#total-pumping-o').text(yValue_O(d));
        // d3.select('#total-storage-m').text(xValue_M(d));
        // d3.select('#total-pumping-m').text(yValue_M(d));
        // d3.select('#zone1').text(d.Zone_1);
        // d3.select('#zone2').text(d.Zone_2);
        // d3.select('#zone3').text(d.Zone_3);
        // d3.select('#zone4').text(d.Zone_4);
        // d3.select('#zone5').text(d.Zone_5);
        // d3.select('#zone6').text(d.Zone_6);
        // d3.select('#zone7').text(d.Zone_7);
        // d3.select('#zone8').text(d.Zone_8);
        // d3.select('#zone9').text(d.Zone_9);
        // d3.select('#zone10').text(d.Zone_10);
        // d3.select('#zone11').text(d.Zone_11);
      };

      var clearData = function() {
        d3.select('#data-source').text('');
        d3.select('#total-storage-o').text('');
        d3.select('#total-pumping-o').text('');
        d3.select('#total-storage-m').text('');
        d3.select('#total-pumping-m').text('');
        d3.select('#zone1').text('');
        d3.select('#zone2').text('');
        d3.select('#zone3').text('');
        d3.select('#zone4').text('');
        d3.select('#zone5').text('');
        d3.select('#zone6').text('');
        d3.select('#zone7').text('');
        d3.select('#zone8').text('');
        d3.select('#zone9').text('');
        d3.select('#zone10').text('');
        d3.select('#zone11').text('');
      };

      // console.log(graph_dataSource);
      // console.log(graphData);

      // load data
      // d3 request options: csv, tsv, json, xhr, xml, html, text.
      d3.json(graphData, function(error, data) {

        data = graphData;
        // console.log(data);

        // This entiore method can be freed from the parens and executed succcefully sans this data assignment,
        // but the subsequent stakeholder data does NOT get loaded in that case.
        // Need to clean up this graph stat - directive time?

        // change string (from CSV) into number format
        data.forEach(function(d) {
          // console.log(d);

          // csv method.
          // d.value_O = +d.value_O;
          // d.value_O_heads = +d.value_O_heads;
          // d.value_M = +d.value_M;
          // d.value_M_heads = +d.value_M_heads;

          // Array method.
          d.dataSource = d[0]; // sourceflie.
          d.value_O = +d[1]; // wells O
          d.value_O_heads = +d[4]; // heads O
          d.value_M = +d[2]; // wells M
          d.value_M_heads = +d[5]; // heads M
          d.value_O_drains = +d[7]; // drains O
          d.value_M_drains = +d[8]; // drains M
          d.Zone_1 = +d[10];
          d.Zone_2 = +d[11];
          d.Zone_3 = +d[12];
          d.Zone_4 = +d[13];
          d.Zone_5 = +d[14];
          d.Zone_6 = +d[15];
          d.Zone_7 = +d[16];
          d.Zone_8 = +d[17];
          d.Zone_9 = +d[18];
          d.Zone_10 = +d[19];
          d.Zone_11 = +d[20];
        });

        xScale.domain([xScaleDomain_Lower, xScaleDomain_Upper]);
        yScale.domain([yScaleDomain_Lower, yScaleDomain_Upper]);

        // x-axis
        canvas.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + (height - 30) + ')')
          .call(xAxis)
          .append('text')
          // .attr('class', 'label')
          .attr('x', (width - 50))
          .attr('y', -10)
          .style('text-anchor', 'end')
          .style('fill', '#FFC0A9')
          .text('Total Pumping in ft3 (for entire model)')
          .attr('class', 'x-axis-label');

        // y-axis
        canvas.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
          .append('text')
          // .attr('class', 'label')
          .attr('transform', 'rotate(-90)')
          .attr('y', 16)
          .style('text-anchor', 'end')
          .style('fill', '#C9D787')
          .text('Total Storage Volume in ft (monthly ave)')
          .attr('class', 'y-axis-label');

        // draw dots
        canvas.selectAll('.dot_O')
          .data(data)
          .enter().append('circle')
          .attr('class', 'dot-O')
          .attr('r', dotRadius)
          .attr('cx', xMap_O) // throwing cx="NaN" error.
          .attr('cy', yMap_O) // throwing cy="NaN" error.
          .style('fill', dotColorOriginal)
          .style('stroke', dotStrokeColor)
          // .on('mouseover', graphInteractionStart)
          .on('mouseover', getCorrelatePair)
          .on('mouseout', graphInteractionStop);

        canvas.selectAll('.dot_M')
          .data(data)
          .enter().append('circle')
          .attr('class', 'dot-M')
          .attr('r', dotRadius)
          .attr('cx', xMap_M) // throwing cx="NaN" error.
          .attr('cy', yMap_M) // throwing cy="NaN" error.
          .style('fill', dotColorModified)
          .style('stroke', dotStrokeColor)
          // .on('mouseover', graphInteractionStart)
          .on('mouseover', getCorrelatePair)
          .on('mouseout', graphInteractionStop);
      });

      // Load Continuum Data.
      d3.csv(aquiferContinuum_dataSource, function(error, data) {
        // change string (from CSV) into number format
        data.forEach(function(d) {
          d.Graph_Value = +d.Graph_Value;
          d.Value = +d.Value;
        });

        xScale.domain([xScaleDomain_Lower, xScaleDomain_Upper]);
        yScale.domain([yScaleDomain_Lower, yScaleDomain_Upper]);

        // threshholds.
        var continuum = canvas.selectAll('g')
          .data(data)
          .enter().append('g');

        continuum.append('svg:line')
          .attr('class', 'aquifer-continuum')
          .attr('x1', xMap_A)
          .attr('y1', 0)
          .attr('x2', xMap_A)
          .attr('y2', (height - 30))
          .style('stroke-width', continuumStrokeWidth)
          .style('stroke', continuumStrokeColor);

        continuum.append('text')
          .attr('class', 'continuum-label')
          .attr('x', xMap_A)
          .attr('y', 10)
          .attr('transform', 'translate(2,-2)')
          .style('fill', continuumTextFill)
          .text(function(d) {
            return d.Description;
          });
      });

      // Datatable events to Graph.
      $rootScope.$on('newDatatableTarget', function(event, args) {
        // console.log('you are touching the datatable!');
        getCorrelatePair(args);
      });

      $rootScope.$on('removeDatatableTarget', function(event, args) {
        // console.log('you stopped touching the datatable!');
        graphInteractionStop(args);
      });
    }

    drawGraph(graph_dataSource);
  };

  }
})();
(function() {
    'use strict';

    angular
        .module('analyze')
        .controller('MapViewController', MapViewController);

    MapViewController.$inject = ['$scope', 'Authentication', 'mapConfig'];

    function MapViewController($scope, Authentication, mapConfig) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.updateView = updateView;

        $scope.$on('analysisDataLoaded', function (event, args) {
            // console.log(args);
            $scope.mapConfig = mapConfig;
            // console.log('analysisData event received by MapViewCTRL. Using the following config data: ');
            // console.log($scope.mapConfig);

            // $scope.updateView(args);
            // $scope.updateView($scope.mapConfig);
        });

        function updateView(data) {
            // console.log('MapView Updated with new data:' , data);
        }
    }
})();
(function() {
  'use strict';

  angular
    .module('core')
    .config(CoreRoutes);

  CoreRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function CoreRoutes($stateProvider, $urlRouterProvider) {

    // Fall back on url-based routing for redirects and bad url catch-all.
    // Only used on core routes configuration.
    $urlRouterProvider
      .when('/analyze', '/analyze/layout')
      .when('/formulations', '/formulations/list')
      .when('/datasets', '/datasets/list')
      .when('/models', '/models/list')
      .when('/publications', '/publications/list')
      .when('/profile', '/profile/view')
      .otherwise('/');

    // Define states.
    var home_state = {
      abstract: false,
      url: '/',
      controller: 'HomeViewController',
      controllerAs: 'home',
      data: {
        title: 'Home'
      }
    };

    var anon_state = {
      abstract: false,
      url: '/index',
      templateUrl: 'modules/core/views/anon.client.view.html',
      controller: 'AnonViewController',
      controllerAs: 'anon',
      data: {
        title: 'Welcome'
      }
    };

    // Populate provider.
    $stateProvider
      .state('home', home_state)
      .state('anon', anon_state);
  }
})();
(function() {
  'use strict';

  angular
    .module('core')
    .controller('AnonViewController', AnonViewController);

  AnonViewController.$inject = ['$scope', 'Authentication'];

  function AnonViewController($scope, Authentication) {
      // This provides Authentication context.
      $scope.authentication = Authentication;
      $scope.whoami = 'default.client.view.html';
      // $scope.currentRoute = 'Anonymous';
      // $scope.logopath = '/modules/core/img/brand/conflux-logo-2-nobg-nocircle.png';
      // $scope.logopath = '/modules/core/img/brand/conflux-logo-idea-v1-md-white.png';
      $scope.logopath = '/modules/core/img/brand/watermark_logo_20151223_v014c1_transparent.png';

      // console.log($scope.logopath);
      console.log($scope.currentRoute);
  }
})();
(function() {
	'use strict';

	angular
		.module('core')
		.run(StateConfig)
		.controller('HeaderController', HeaderController);

	StateConfig.$inject = ['$rootScope', '$state', '$stateParams'];

	function StateConfig($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
	}

	HeaderController.$inject = ['$rootScope', '$scope', 'Authentication', 'Menus'];

	function HeaderController($rootScope, $scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.currentRoute = 'Navigation';
		$scope.toggleCollapsibleMenu = toggleCollapsibleMenu;
		$scope.changeNavIcon = changeNavIcon;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		// console.log($scope.currentRoute);
		$scope.current_icon = 'fa-desktop'; // fa-globe, fa-desktop, fa-area-chart, fa-puzzle-piece, fa-database, fa-cubes, fa-newspaper-o

		// Need to consolidate all app info into a config object that is shared across modules.
		$scope.appTitle = 'Watermark';
		$scope.versionNumber = 'Alpha v0.23.314';
		// $scope.iconpath = '/modules/core/img/brand/conflux-logo-v1-icon-white-nods.png';
		// $scope.iconpath = '/modules/core/img/brand/watermark_logo_20151223_v014c0_transparent.png';
		$scope.iconpath = '/modules/core/img/brand/watermark_logo_20151223_v014c1_transparent.png';
		// $scope.iconpath = '/modules/core/img/brand/watermark_logo_20151223_v014c2_transparent.png';
		// $scope.iconpath = '/modules/core/img/brand/watermark_logo_20151223_v005.png'; // 004, 005, 007, 008, 011,

		function toggleCollapsibleMenu() {
			$scope.isCollapsed = !$scope.isCollapsed;
		}

		function changeNavIcon() {
			// console.log($rootScope.$state.current.data.title);

			switch ($rootScope.$state.current.data.title) {
				case 'Dashboard':
				  $scope.current_icon = 'fa-desktop';
				  break;
				case 'Analyze':
				  $scope.current_icon = 'fa-area-chart';
				  break;
				case 'Formulations':
				  $scope.current_icon = 'fa-puzzle-piece';
				  break;
				case 'Data Sources':
				  $scope.current_icon = 'fa-database';
				  break;
				case 'Models':
				  $scope.current_icon = 'fa-cubes';
				  break;
				case 'Publications':
				  $scope.current_icon = 'fa-newspaper-o';
				  break;
				case 'Profile':
				  $scope.current_icon = 'fa-user';
				  break;
				case 'Documents':
				  $scope.current_icon = 'fa-file-text';
				  break;
				case 'About':
				  $scope.current_icon = 'fa-info-circle';
				  break;
			}
		}

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function(event) {
			// console.log('state changed', event);
			$scope.isCollapsed = false;
			changeNavIcon();
		});

	}
})();
(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomeViewController', HomeViewController);

  HomeViewController.$inject = ['$scope', 'Authentication', '$state'];

  function HomeViewController($scope, Authentication, $state) {
  // This provides Authentication context.
  $scope.authentication = Authentication;
  $scope.currentRoute = 'Home';
  // console.log($scope.currentRoute);

    if ($scope.authentication.user === '') {
        // console.log('NO AUTH!');
        $state.go('anon');
    } else {
        // console.log('WELCOME');
        $state.go('dashboard');
    }
  }
})();
(function() {
	'use strict';

	//Menu service used for managing  menus
	angular
		.module('core')
		.service('Menus', Menus);

	Menus.$inject = [];

	function Menus() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
})();
(function() {
  'use strict';

  angular
    .module('dashboard')
    .config(DashboardRoutes);

  DashboardRoutes.$inject = ['$stateProvider'];

  function DashboardRoutes($stateProvider) {

    // Define states.
    var dashboard_state = {
      abstract: false,
      url: '/dashboard',
      templateUrl: 'modules/dashboard/views/dashboard.client.view.html',
      controller: 'DashboardViewController',
      controllerAs: 'dashboard',
      data: {
        title: 'Dashboard'
      }
    };

    // Populate provider.
    $stateProvider
      .state('dashboard', dashboard_state);
  }
})();
(function() {
  'use strict';

  angular
    .module('dashboard')
    .controller('DashboardViewController', DashboardViewController);

  DashboardViewController.$inject = ['$scope', 'Authentication'];

  function DashboardViewController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.currentRoute = 'Dashboard';
    $scope.listDisplayLimit = 9;
    $scope.clicked = clicked;

    // console.log($scope.currentRoute);

    function clicked(target) {
        // console.log(target);
    }
  }
})();
(function() {
  'use strict';

 //  angular
 //    .module('datasets')
 //    .run(DatasetsConfig);

 //  DatasetsConfig.$inject = ['Menus'];

	// function DatasetsConfig(Menus) {
	// 	// Set top bar menu items
	// 	Menus.addMenuItem('topbar', 'Datasets', 'datasets', 'dropdown', '/datasets(/create)?');
	// 	Menus.addSubMenuItem('topbar', 'datasets', 'List Datasets', 'datasets');
	// 	Menus.addSubMenuItem('topbar', 'datasets', 'New Dataset', 'datasets/create');
	// }
})();
(function() {
	'use strict';

	angular
		.module('datasets')
		.config(DatasetsRoutes);

	DatasetsRoutes.$inject = ['$stateProvider'];

	function DatasetsRoutes($stateProvider) {

    // Define states.
    var datasets_state = {
      abstract: false,
      url: '/datasets',
      templateUrl: 'modules/datasets/views/datasets.client.view.html',
      controller: 'DatasetsViewController',
      controllerAs: 'datasetsView',
      data: {
        title: 'Data Sources'
      }
    };

    var datasets_list_state = {
      abstract: false,
      url: '/list',
      templateUrl: 'modules/datasets/views/list-datasets.client.view.html',
      controller: 'DatasetsController',
      controllerAs: 'datasets'
    };

    var datasets_list_details_state = {
      abstract: false,
      url: '/details/:datasetId',
      templateUrl: 'modules/datasets/views/view-dataset.client.view.html',
      controller: 'DatasetsController',
      controllerAs: 'datasets'
    };

    var datasets_list_edit_state = {
      abstract: false,
      url: '/edit/:datasetId',
      templateUrl: 'modules/datasets/views/edit-dataset.client.view.html',
      controller: 'DatasetsController',
      controllerAs: 'datasets'
    };

    var datasets_list_load_state = {
      abstract: false,
      url: '/load',
      templateUrl: 'modules/datasets/views/create-dataset.client.view.html',
      controller: 'DatasetsController',
      controllerAs: 'datasets'
    };

    var datasets_list_transform_state = {
      abstract: false,
      url: '/transform',
      templateUrl: 'modules/datasets/views/datasets.transform.client.view.html',
      controller: 'DatasetsTransformViewController',
      controllerAs: 'datasetsTransform'
    };

    var datasets_list_visualize_state = {
      abstract: false,
      url: '/visualize',
      templateUrl: 'modules/datasets/views/datasets.visualize.client.view.html',
      controller: 'DatasetsVisualizeViewController',
      controllerAs: 'datasetsVisualize'
    };

    // Populate provider.
		$stateProvider
      .state('datasets', datasets_state)
      .state('datasets.list', datasets_list_state)
      .state('datasets.list.details', datasets_list_details_state)
      .state('datasets.list.edit', datasets_list_edit_state)
      .state('datasets.list.load', datasets_list_load_state)
      .state('datasets.list.transform', datasets_list_transform_state)
      .state('datasets.list.visualize', datasets_list_visualize_state);
	}
})();
(function() {
  'use strict';

  // Datasets controller
  angular
    .module('datasets')
    .controller('DatasetsController', DatasetsController);

  DatasetsController.$inject = ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Datasets', 'FileUploader']; /* '$upload', 'multipartForm', */

	function DatasetsController($scope, $state, $stateParams, $location, Authentication, Datasets, FileUploader) { /* $upload, multipartForm, */
		$scope.authentication = Authentication;
    $scope.currentRoute = 'Datasets';
		$scope.currentUser = Authentication.user;
    $scope.create = create;
    $scope.remove = remove;
    $scope.update = update;
    $scope.find = find;
    $scope.findOne = findOne;
    $scope.whatfiles = whatfiles;
    $scope.newDataset = {};
    // console.log($scope.currentRoute);

		// Create new Dataset
		function create() {
			// Create new Dataset object
			var dataset = new Datasets ({
				name: this.name
			})

			// Redirect after save
			dataset.$save(function(response) {
				// $location.path('datasets/' + response._id);
				// $location.path('datasets');
				$state.go('datasets', {}, {reload: true});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Dataset
		function remove(dataset) {
			if ( dataset ) {
				dataset.$remove();

				for (var i in $scope.datasets) {
					if ($scope.datasets [i] === dataset) {
						$scope.datasets.splice(i, 1);
					}
				}
			} else {
				$scope.dataset.$remove(function() {
					// $location.path('datasets');
					$state.go('datasets', {}, {reload: true});
				});
			}
		}

		// Update existing Dataset
		function update() {
			var dataset = $scope.dataset;

			dataset.$update(function() {
				// $location.path('datasets/' + dataset._id);
				$state.go('datasets.list', {}, {reload: true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Find a list of Datasets
		// $scope.find = function() {
		// 	$scope.datasets = Datasets.query();
		// };

		// Find a list of Datasets belonging to the current user.
		function find(user) {
			Datasets.query(function(datasets) {
				$scope.datasets = user ? datasets.filter(function(dataset) {
					return dataset.user._id === user._id;
				}) : datasets;
			});
		}

		// Find existing Dataset
		function findOne() {
			$scope.dataset = Datasets.get({
				datasetId: $stateParams.datasetId
			});
		}


    /* START UPLOAD TESTS */

    // SIMPLE TEST - UPLOADS.

    // $scope.Submit = function() {
    //     var uploadUrl = '/uploads';
    //     multipartForm.post(uploadUrl, $scope.newDataset);
    // };

		// MORE MULTIPART TESTS - METHOD 1: ng-file-upload.js

		// $upload.upload({
  //           url: '/serverRouteUrl', //upload.php script, node.js route, etc..
  //           method: 'POST', //Post or Put
  //           headers: {'Content-Type': 'multipart/form-data'},
  //           //withCredentials: true,
  //           data: JsonObject, //from data to send along with the file
  //           file: blob, // or list of files ($files) for html5 only
  //           //fileName: 'photo' // to modify the name of the file(s)
  //       }).success(function (response, status) {
  //              //success
  //           }
  //       ).error(function (err) {
  //              //error
  //           }
  //       );

  		// COMPLEX TESTS - METHOD 3: angular-file-upload.js

    // Trace file data out.
    function whatfiles(uploader) {
      // console.log(uploader);
      console.log(uploader.queue);
    }

		// $scope.uploader = new FileUploader();
		var uploader = $scope.uploader = new FileUploader({
          // url: './uploads.php'
          url: '/uploads'
      });

    // FILTERS
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    // console.info('uploader', uploader);
	}
})();
(function() {
  'use strict';

  angular
    .module('core')
    .controller('DatasetsViewController', DatasetsViewController);

  DatasetsViewController.$inject = ['$scope', 'Authentication'];

  function DatasetsViewController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.clicked = clicked;

    function clicked(target) {
        console.log(target);
    }
  }
})();
'use strict';

angular.module('core').controller('DatasetsTransformViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.transform.client.view.html';
        console.log($scope.whoami);

    }
]);
'use strict';

angular.module('core').controller('DatasetsVisualizeViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'datasets.visualize.client.view.html';
        console.log($scope.whoami);

    }
]);
(function() {
  'use strict';

  //Datasets service used to communicate Datasets REST endpoints
  angular
    .module('datasets')
    .factory('Datasets', Datasets);

  Datasets.$inject = ['$resource'];

	function Datasets($resource) {
		return $resource('datasets/:datasetId', { datasetId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
})();
(function() {
  'use strict';

  angular
    .module('mcsdss.directives')
    .directive('bsDropdown', bsDropdown);

  bsDropdown.$inject = ['$compile']; // '$rootScope', '$scope',

  function bsDropdown($compile) { // $rootScope, $scope,
    return {
      restrict: 'E',
      scope: {
        items: '=dropdownData',
        doSelect: '&selectVal',
        selectedItem: '=preselectedItem'
      },
      link: function(scope, element, attrs) {
        var html = '';
        switch (attrs.menuType) {
          case "button":
            html += '<div class="btn-group"><button class="dropdown-toggle btn btn-primary default-global-transform drop-shadow" data-toggle="dropdown">Select Dataset <span class="caret rotate"></span></button>'; // <button class="btn btn-info dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>
            break;
          default:
            html += '<div class="dropdown"><a class="dropdown-toggle" role="button" data-toggle="dropdown"  href="javascript:;">Dropdown<b class="caret"></b></a>';
            break;
        }

        html += '<ul class="dropdown-menu"><li ng-repeat="item in items"><a tabindex="-1" data-ng-click="selectVal(item)">{{item.name}}</a></li></ul></div>';
        element.append($compile(html)(scope));

        for (var i = 0; i < scope.items.length; i++) {
          if (scope.items[i].id === scope.selectedItem) {
            scope.bSelectedItem = scope.items[i];
            break;
          }
        }

        scope.selectVal = function(item) {
          switch (attrs.menuType) {
            case "button":
              $('button.button-label', element).html(item.name);
              break;
            default:
              $('a.dropdown-toggle', element).html('<b class="caret"></b> ' + item.name);
              break;
          }

          scope.doSelect({ selectedVal: item.name }); //item.id
        };

        scope.selectVal(scope.bSelectedItem);
      }
    };
  }

})();

(function () {
  'use strict';

  angular
    .module('mcsdss.directives')
    .directive('fileModel', FileModel);

  FileModel.$inject = ['$parse'];

  function FileModel($parse) {

    var directiveDefinitionObject = {
      // compile: false,
      // controller: false,
      // controllerAs: false,
      // link: false,
      // priority: 0,
      // require: false,
      restrict: 'A',
      // scope: {},
      // template: false,
      // templateUrl: false,
      // terminal: false,
      // transclude: false,
      // type: false
    };

    directiveDefinitionObject.link = postLink;

    function postLink(scope, element, attrs) {

      var model = $parse(attrs.fileModel); // $scope.dataset.file
      var modelSetter = model.assign;

      element.bind('change',
        function() {
          scope.$apply(
            function() {
              modelSetter(scope, element[0].files[0]);
            }
          );
        }
      );
    }

    return directiveDefinitionObject;

    // Return the directive object, restricted to attribute.
    // return {
    //   restrict: 'A',
    //   link: function(scope, element, attrs) {
    //     var model = $parse(attrs.fileModel); // $scope.dataset.file
    //     var modelSetter = model.assign;

    //     element.bind('change', function() {
    //       scope.$apply(function() {
    //       modelSetter(scope, element[0].files[0]);
    //     });
    //   })
    // };

  }
})();
(function() {
  'use strict';

  angular
    .module('mcsdss.directives') // core
    .directive('leafletMap', LeafletMap);

  LeafletMap.$inject = ['$rootScope'];

  function LeafletMap($rootScope) {

    var directiveDefinitionObject = {
      compile: false,
      controller: false,
      controllerAs: false,
      link: false,
      priority: 0,
      require: false,
      restrict: 'E',
      scope: {},
      template: false,
      templateUrl: false,
      terminal: false,
      transclude: false,
      type: false
    };

    directiveDefinitionObject.link = function postLink(scope, element) {

      // Base Tile Layers.
      // These are hard coded into the directive and will remain sttaic unless new baseTile layers are needed.
      var mqLink = '<a href="http://www.mapquest.com/">MapQuest</a>';
      var mqPic = '<img src="http://developer.mapquest.com/content/osm/mq_logo.png">';
      var mqArialUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg';
      var mqosmUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg';
      var mqArialAttrib = 'Tiles courtesy of ' + mqLink + mqPic;
      var mqosmAttrib = 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency. Tiles courtesy of ' + mqLink + mqPic;
      var mqArialMap = L.tileLayer(mqArialUrl, {
        attribution: mqArialAttrib,
        subdomains: '1234'
      });
      var mqosmMap = L.tileLayer(mqosmUrl, {
        attribution: mqosmAttrib,
        subdomains: '1234'
      });

      var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
      var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      var osmAttrib = '&copy; ' + osmLink + ' Contributors';
      var osmMap = L.tileLayer(osmUrl, {
        attribution: osmAttrib
      });

      var osmBwLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
      var osmBwUrl = 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';
      var osmBwAttrib = '&copy; ' + osmBwLink + ' Contributors';
      var osmBwMap = L.tileLayer(osmBwUrl, {
        attribution: osmBwAttrib
      });

      var thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';
      var thunLandscapeUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png';
      var thunOutdoorsUrl = 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png';
      var thunAttrib = '&copy; ' + osmLink + ' Contributors & ' + thunLink;
      var thunLandscapeMap = L.tileLayer(thunLandscapeUrl, {
        attribution: thunAttrib
      });
      var thunOutdoorsMap = L.tileLayer(thunOutdoorsUrl, {
        attribution: thunAttrib
      });

      var stamenLink = '<a href="http://stamen.com">Stamen Design</a>';
      var stamenUrl = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
      var stamenAttrib = '&copy; ' + mqLink + ' Contributors & ' + stamenLink;
      var stamenMap = L.tileLayer(stamenUrl, {
        attribution: stamenAttrib
      });

      var esriLink = '<a href="http://www.esri.com/">Esri</a>';
      var esriWhoLink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
      var esriUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      var esriAttrib = '&copy; ' + esriLink + ', ' + esriWhoLink;
      var esriMap = L.tileLayer(esriUrl, {
        attribution: esriAttrib
      });

      // Colors.
      var color_black = '#000000';
      var color_grey = '#4D4B5B';
      var color_white = '#FFFFFF';
      var color_brown = '#C9985B';
      var color_purple = '#91278D';
      var color_blue = '#539CBE';
      var color_green = '#018752';
      var color_lime = '#C9FA58';
      var color_yellow = '#F9E555';
      var color_gold = '#FAA635';
      var color_orange = '#F2572A';
      var color_red = '#D21245';

      // EAA Colors
      var color_eaa_Blue = '#425968';
      var color_eaa_Orange = '#AB650D';
      var color_eaa_Gold = '#8F8100';
      var color_eaa_Tan = '#E6D395';
      var color_eaa_Stone = '#8E8C7A';
      var color_eaa_Lake = '#71B2C9';
      var color_eaa_Amber = '#C6930A';
      var color_eaa_Orange = '#D15B05';
      var color_eaa_Brown = '#6D4F47';
      var color_eaa_Melon = '#AADD6D';
      var color_eaa_Teal = '#00B28C';
      var color_eaa_Sky = '#4298B5';

      // Styles for geojson layers.

      var weight = 1.0;
      var opacity = 1.0;
      var fillOpacity = 0.6;
      var fillOpacityHover = 0.8;

      var baseStyle = {
        'clickable': true,
        'color': color_black,
        'fillColor': color_grey,
        'weight': weight,
        'opacity': opacity,
        'fillOpacity': fillOpacity
      };
      var baseStyleHover = {
        'fillOpacity': fillOpacityHover
      };

      // var usaStyle = { 'fillColor': color_eaa_Blue };
      var usaStyle = {};
      var usaStyleHover = {};

      // var texasStyle = {'fillColor': color_eaa_Orange, 'fillOpacity': 0.0, 'color': color_eaa_Orange, 'weight': '3px'};
      // var texasStyleHover = { 'fillOpacity': 0.0 };
      var texasStyle = {
        'fillColor': color_eaa_Orange
      };
      var texasStyleHover = {};

      // var majorAquiferStyle = { 'fillColor': color_eaa_Lake };
      var majorAquiferStyle = {};
      var majorAquiferStyleHover = {};

      // var eaaBoundaryZonesStyle = { 'fillColor': color_eaa_Gold };
      var eaaBoundaryZonesStyle = {};
      var eaaBoundaryZonesStyleHover = {};

      // var aquiferZonesStyle = { 'fillColor': color_eaa_Melon };
      var aquiferZonesStyle = {};
      var aquiferZonesStyleHover = {};

      var bsgamZonesStyle = {};
      var bsgamZonesStyleHover = {};

      var bsgamZonesMergedStyle = {};
      var bsgamZonesMergedStyleHover = {};

      // Geojson to display.
      var usaGeojson = './data/geojson/USA.geo.json';
      var texasGeojson = './data/geojson/TX.geo.json';
      var majorAquifersGeojson = './data/geojson/NEW_major_aquifers_dd_reduced100.geo.json';
      var eaaBoundaryZonesGeojson = './data/geojson/eaa_boundary_EPSG-3081.geo.json';
      var aquiferZonesGeojson = './data/geojson/eaa-aquifer-zones-2014.geo.json';
      var bsgam_kzonesGeojson = './data/geojson/BSGAMKZ.geo.json';
      var bsgam_kzones_mergedGeojson = './data/geojson/BSGAMKZones.merged.WGS84.lco15.geo.json';

      // GeoJSON Layers.
      var usaLayer = new L.LayerGroup();
      var texasLayer = new L.LayerGroup();
      var majorAquifersLayer = new L.LayerGroup();
      var aquiferZonesLayer = new L.LayerGroup();
      var eaaBoundaryLayer = new L.LayerGroup();
      var bsgam_kzonesLayer = new L.LayerGroup();
      var bsgam_kzones_mergedLayer = new L.LayerGroup();

      // Marker Layers.
      // Look into using the MarkerClusterGroup.
      var allMarkersLayer = new L.LayerGroup();

      // Merges two objects. Note: Earlier objects override later objects.
      var mergeObjects = function() {
        var o = {};
        for (var i = arguments.length - 1; i >= 0; i--) {
          var s = arguments[i];
          for (var k in s) {
            o[k] = s[k];
          }
        }
        return o;
      };

      // Geojson interaction.
      var geojsonHandler = function(feature, layer, style, styleHover) {
        if (feature.properties) {
          // console.log(feature.properties);
          var popupString = '<div class="popup">';
          var layerClassName = {};
          for (var k in feature.properties) {
            var v = feature.properties[k];
            popupString += k + ': ' + v + '<br />';
            layerClassName = k + '-' + v;
          }
          popupString += '</div>';
          layer.bindPopup(popupString);
          layer.setStyle({
            'className': layerClassName
          });
        }

        if (!(layer instanceof L.Point)) {
          layer.on('mouseover', function() {
            var thisStyleHover = mergeObjects(styleHover, baseStyleHover);
            layer.setStyle(thisStyleHover);
          });
          layer.on('mouseout', function() {
            var thisStyle = mergeObjects(style, baseStyle);
            layer.setStyle(thisStyle);
          });
        }
      };

      // Load geojson.
      var processGeojson = function(data, layerGroup, layerStyle, layerStyleHover) {
        var geojson = L.geoJson(data, {
          style: function(feature, layer) {
            var thisStyle = mergeObjects(layerStyle, baseStyle);
            return thisStyle;
          },
          onEachFeature: function(feature, layer) {
            // console.log(feature);
            geojsonHandler(feature, layer, layerStyle, layerStyleHover);
          }
        });
        geojson.addTo(layerGroup);
      };

      $.getJSON(usaGeojson, function(data) {
        processGeojson(data, usaLayer, usaStyle, usaStyleHover);
      });

      $.getJSON(texasGeojson, function(data) {
        processGeojson(data, texasLayer, texasStyle, texasStyleHover);
      });

      $.getJSON(majorAquifersGeojson, function(data) {
        processGeojson(data, majorAquifersLayer, majorAquiferStyle, majorAquiferStyleHover);
      });

      $.getJSON(aquiferZonesGeojson, function(data) {
        processGeojson(data, aquiferZonesLayer, aquiferZonesStyle, aquiferZonesStyleHover);
      });

      $.getJSON(eaaBoundaryZonesGeojson, function(data) {
        var geojson = L.geoJson(data, {
          style: function(feature, layer) {
            var thisStyle = mergeObjects(eaaBoundaryZonesStyle, baseStyle);
            return thisStyle;
          },
          onEachFeature: function(feature, layer) {
            var popupString = '<div class="popup">Edwards Aquifer Association Boundary Zone</div>';
            layer.bindPopup(popupString);

            if (!(layer instanceof L.Point)) {
              layer.on('mouseover', function() {
                var eaaStyleHover = mergeObjects(eaaBoundaryZonesStyleHover, baseStyleHover);
                layer.setStyle(eaaStyleHover);
              });
              layer.on('mouseout', function() {
                var eaaStyle = mergeObjects(eaaBoundaryZonesStyle, baseStyle);
                layer.setStyle(eaaStyle);
              });
            }
          }
        });
        geojson.addTo(eaaBoundaryLayer);
      });

      $.getJSON(bsgam_kzonesGeojson, function(data) {
        processGeojson(data, bsgam_kzonesLayer, bsgamZonesStyle, bsgamZonesStyleHover);
      });

      $.getJSON(bsgam_kzones_mergedGeojson, function(data) {
        processGeojson(data, bsgam_kzones_mergedLayer, bsgamZonesMergedStyle, bsgamZonesMergedStyleHover);
      });

      var getColor = function(d) {
        return d >= 2.0 ? '#400026' :
          d > 1.8 ? '#800026' :
          d > 1.6 ? '#BD0026' :
          d > 1.4 ? '#E31A1C' :
          d > 1.2 ? '#FC4E2A' :
          d > 1.0 ? '#FD8D3C' :
          d > 0.8 ? '#FEB24C' :
          d > 0.6 ? '#FED976' :
          d > 0.4 ? '#FFEDA0' :
          d > 0.2 ? '#FFFEBA' :
          '#FFFFFF';
      };

      var encodeZones = function(d) {
        // console.log(d);
        // console.log(d.Zone_1,d.Zone_2,d.Zone_3,d.Zone_4,d.Zone_5,d.Zone_6,d.Zone_7,d.Zone_8,d.Zone_9,d.Zone_10,d.Zone_11);

        // Define colors for pumping scalars.
        // var pumpingScalarColors = d3.scale.category20();
        //
        // Styles require a map object with corresponding zones to color code.
        // $('.Kzone-1')[0].style.fill = pumpingScalarColors(d.Zone_1);
        // $('.Kzone-2')[0].style.fill = pumpingScalarColors(d.Zone_2);
        // $('.Kzone-3')[0].style.fill = pumpingScalarColors(d.Zone_3);
        // $('.Kzone-4')[0].style.fill = pumpingScalarColors(d.Zone_4);
        // $('.Kzone-5')[0].style.fill = pumpingScalarColors(d.Zone_5);
        // $('.Kzone-6')[0].style.fill = pumpingScalarColors(d.Zone_6);
        // $('.Kzone-7')[0].style.fill = pumpingScalarColors(d.Zone_7);
        // $('.Kzone-8')[0].style.fill = pumpingScalarColors(d.Zone_8);
        // $('.Kzone-9')[0].style.fill = pumpingScalarColors(d.Zone_9);
        // $('.Kzone-10')[0].style.fill = pumpingScalarColors(d.Zone_10);
        // $('.Kzone-11')[0].style.fill = pumpingScalarColors(d.Zone_11);

        // console.log(d[0][0][0]['__data__']);
        // console.log(d[0][0][0]['__data__']['dataSource']);
        // console.log(d[0][0][0]['__data__']['Zone_1']);

        $('.Kzone-1')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_1']);
        $('.Kzone-2')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_2']);
        $('.Kzone-3')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_3']);
        $('.Kzone-4')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_4']);
        $('.Kzone-5')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_5']);
        $('.Kzone-6')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_6']);
        $('.Kzone-7')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_7']);
        $('.Kzone-8')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_8']);
        $('.Kzone-9')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_9']);
        $('.Kzone-10')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_10']);
        $('.Kzone-11')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_11']);
      };

      var decodeZones = function() {
        // console.log('zones decoded.');
        $('.Kzone-1')[0].style.fill = color_grey;
        $('.Kzone-2')[0].style.fill = color_grey;
        $('.Kzone-3')[0].style.fill = color_grey;
        $('.Kzone-4')[0].style.fill = color_grey;
        $('.Kzone-5')[0].style.fill = color_grey;
        $('.Kzone-6')[0].style.fill = color_grey;
        $('.Kzone-7')[0].style.fill = color_grey;
        $('.Kzone-8')[0].style.fill = color_grey;
        $('.Kzone-9')[0].style.fill = color_grey;
        $('.Kzone-10')[0].style.fill = color_grey;
        $('.Kzone-11')[0].style.fill = color_grey;
      };

      // Populate Map Controls.
      var baseLayers = {
        'MapQuest Open Arial': mqArialMap,
        'MapQuest-OSM': mqosmMap,
        'Open Street Map': osmMap,
        // 'Open Street Map (Black and White)': osmBwMap,   // Not performant.
        'ESRI World Imagery': esriMap,
        'Thunderforest Landscape': thunLandscapeMap,
        'Thunderforest Outdoors': thunOutdoorsMap,
        'Stamen Watercolor': stamenMap
      };

      var overlays = {
        // 'EAA Monitoring Stations': allMarkersLayer,
        // 'USA': usaLayer,
        // 'Texas': texasLayer,
        'Major Aquifers': majorAquifersLayer,
        'Aquifer Zones': aquiferZonesLayer,
        // 'EAA Boundary Zone': eaaBoundaryLayer,
        'bsgam kzones': bsgam_kzonesLayer,
        'bsgam kzones merged': bsgam_kzones_mergedLayer
      };

      // Map Panning/Zooming.

      var zoomOptions = {
        'animate': 'true'
      };
      var panOptions = {
        'animate': true,
        'duration': 5,
        'easeLinearity': 0.25,
        'noMoveStart': 'false'
      };
      var zoomPanOptions = {
        'reset': false,
        'pan': panOptions,
        'zoom': zoomOptions,
        'animate': 'true'
      };
      var fitBoundsOptions = {
        'paddingTopLeft': [0, 0],
        'paddingBottomRight': [0, 0],
        'maxZoom': 16
      };
      var panOptionsInitial = {
        'animate': true,
        'duration': 3,
        'easeLinearity': 0.50,
        'noMoveStart': 'false'
      };
      var panOptionsInteractive = {
        'animate': true,
        'duration': 2,
        'easeLinearity': 0.25,
        'noMoveStart': 'false'
      };
      var panOptionsMarkers = {
        'animate': true,
        'duration': 3,
        'easeLinearity': 0.25,
        'noMoveStart': 'false'
      };
      var panByPoint = new L.Point(-350, 0);

      // Build Map.

      // Map config inputs.
      // var targetPosition = [30, -99];
      // var initialZoom = 6;
      var targetPosition = [30.15, -97.85];
      var initialZoom = 11;
      // Derive map config.
      var offsetConstant = 10; //100;
      var baseOffset = offsetConstant / initialZoom;
      var initialPanLatOffset = targetPosition[0]; // + baseOffset;
      var initialPanLonOffset = targetPosition[1] - baseOffset;
      var initialPosition = [initialPanLatOffset, initialPanLonOffset];

      var map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        inertia: false,
        keyboard: true,
        dragging: true,
        scrollWheelZoom: true,
        zoomAnimation: true,
        click: true,
        layers: [thunOutdoorsMap] // mqArialMap, only add one!
      }).setView(initialPosition, initialZoom);

      map.on('popupopen', function(centerMarker) {
        var cM = map.project(centerMarker.popup._latlng);
        cM.y -= centerMarker.popup._container.clientHeight / 2;
        var cZ = map.getZoom();
        map.setView(map.unproject(cM), cZ, {
          animate: true
        });
      });

      L.Browser.touch = true;
      L.Icon.Default.imagePath = './styles/images';

      // Map Controls.
      L.control.zoom({
        position: 'topleft'
      }).addTo(map);

      L.control.scale({
        position: 'bottomleft'
      }).addTo(map);

      L.control.layers(baseLayers, overlays, {
        position: 'topright' //'topleft'
      }).addTo(map);

      // Add layer control to a different div.
      // Has z-index issues... See: https://groups.google.com/forum/#!topic/leaflet-js/rKMZX3PKFuI
      // var layerControl = L.control.layers(baseLayers, overlays, { position: 'topright' });
      // layerControl.addTo(map);
      // layerControl._container.remove();
      // document.getElementById('map-controls-layer').appendChild(layerControl.onAdd(map));

      L.control.attribution({
        position: 'bottomright'
      }).addTo(map);

      // Append attribution to different layer.
      // Also has z-index issues, but could be positioned well enough.
      // var layerControl = L.control.attribution({ position: 'bottomright' });
      // layerControl.addTo(map);
      // layerControl._container.remove();
      // document.getElementById('map-controls-layer').appendChild(layerControl.onAdd(map));

      // Setup Initial Visible Layers.
      // texasLayer.addTo(map);
      // eaaBoundaryLayer.addTo(map);
      // allMarkersLayer.addTo(map);
      // bsgam_kzonesLayer.addTo(map);
      bsgam_kzones_mergedLayer.addTo(map);

      // Trigger Initial Animation.
      map.panTo(targetPosition, panOptionsInitial);

      // console.log(map._layers);
      // console.log(map.getPanes());

      // Graph events to Map.
      $rootScope.$on('addMapTarget', function(event, args) {
        // console.log('you are touching the graph!');
        // console.log(args);
        if (map.hasLayer(bsgam_kzones_mergedLayer)) {
          encodeZones(args);
        } // else { /* no kzone layer */ }
      });

      $rootScope.$on('removeMapTarget', function(event, args) {
        // console.log('you stopped touching the graph!');
        if (map.hasLayer(bsgam_kzones_mergedLayer)) {
          decodeZones();
        } // else { /* no kzone layer */ }
      });
    };

    return directiveDefinitionObject;
  }
})();
(function() {
  'use strict';

  angular
    .module('documentation')
    .config(DocumentationRoutes);

  DocumentationRoutes.$inject = ['$stateProvider'];

  function DocumentationRoutes($stateProvider) {

    // Define states.
    var documentation_state = {
      abstract: false,
      url: '/documentation',
      templateUrl: 'modules/documentation/views/documentation.client.view.html',
      controller: 'DocumentationViewController',
      controllerAs: 'documentation',
      data: {
        title: 'Documents'
      }
    };

    // Populate provider.
    $stateProvider
      .state('documentation', documentation_state);
  }
})();
(function() {
  'use strict';

  angular
    .module('documentation')
    .controller('DocumentationViewController', DocumentationViewController);

  DocumentationViewController.$inject = ['$scope', 'Authentication'];

  function DocumentationViewController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.currentRoute = 'Documentation';
    $scope.clicked = clicked;
    // console.log($scope.currentRoute);

    function clicked(target) {
        // console.log(target);
    }
  }
})();
(function() {
	'use strict';

	angular
		.module('formulations')
		.config(FormulationsRoutes);

	FormulationsRoutes.$inject =['$stateProvider'];

	function FormulationsRoutes($stateProvider) {

    // Define states.
    var formulations_state = {
      abstract: false,
      url: '/formulations',
      templateUrl: 'modules/formulations/views/formulations.client.view.html',
      controller: 'FormulationsViewController',
      controllerAs: 'formulationsView',
      data: {
        title: 'Formulations'
      }
    };

    var formulations_list_state = {
      abstract: false,
      url: '/list',
      templateUrl: 'modules/formulations/views/list-formulations.client.view.html',
      controller: 'FormulationsController',
      controllerAs: 'formulations'
    };

    var formulations_list_details_state = {
      abstract: false,
      url: '/details/:formulationId',
      templateUrl: 'modules/formulations/views/view-formulation.client.view.html',
      controller: 'FormulationsController',
      controllerAs: 'formulations'
    };

    var formulations_list_edit_state = {
      abstract: false,
      url: '/edit/:formulationId',
      templateUrl: 'modules/formulations/views/edit-formulation.client.view.html',
      controller: 'FormulationsController',
      controllerAs: 'formulations'
    };

    var formulations_list_load_state = {
      abstract: false,
      url: '/load',
      templateUrl: 'modules/formulations/views/create-formulation.client.view.html',
      controller: 'FormulationsController',
      controllerAs: 'formulations'
    };

    // Populate provider.
		$stateProvider
      .state('formulations', formulations_state)
      .state('formulations.list', formulations_list_state)
      .state('formulations.list.details', formulations_list_details_state)
      .state('formulations.list.edit', formulations_list_edit_state)
      .state('formulations.list.load', formulations_list_load_state);
	}
})();
(function() {
	'use strict';

	// Formulations controller
	angular
		.module('formulations')
		.controller('FormulationsController', FormulationsController);

	FormulationsController.$inject = ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Formulations'];

	function FormulationsController($scope, $state, $stateParams, $location, Authentication, Formulations) {
		$scope.authentication = Authentication;
		$scope.currentRoute = 'Formulations';
		$scope.currentUser = Authentication.user;
		$scope.create = create;
		$scope.remove = remove;
		$scope.update = update;
		$scope.find = find;
		$scope.findOne = findOne;
    // console.log($scope.currentRoute);

		// Create new Formulation
		function create() {
			// Create new Formulation object
			var formulation = new Formulations ({
				name: this.name
			});

			// Redirect after save
			formulation.$save(function(response) {
				// $location.path('formulations/' + response._id);
				$state.go('formulations', {}, {reload: true});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Remove existing Formulation
		function remove(formulation) {
			if ( formulation ) {
				formulation.$remove();

				for (var i in $scope.formulations) {
					if ($scope.formulations [i] === formulation) {
						$scope.formulations.splice(i, 1);
					}
				}
			} else {
				$scope.formulation.$remove(function() {
					// $location.path('formulations');
					$state.go('formulations', {}, {reload: true});
				});
			}
		}

		// Update existing Formulation
		function update() {
			var formulation = $scope.formulation;

			formulation.$update(function() {
				// $location.path('formulations/' + formulation._id);
				$state.go('formulations.list', {}, {reload: true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Find a list of Formulations
		// $scope.find = function() {
		// 	$scope.formulations = Formulations.query();
		// };

		// Find a list of Formulations belonging to the current user.
		function find(user) {
			Formulations.query(function(formulations) {
				$scope.formulations = user ? formulations.filter(function(formulation) {
					return formulation.user._id === user._id;
				}) : formulations;
			});
		}

		// Find existing Formulation
		function findOne() {
			$scope.formulation = Formulations.get({
				formulationId: $stateParams.formulationId
			});
		}
	}
})();
'use strict';

angular.module('core').controller('FormulationsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.clicked = function(target) {
            console.log(target);
        };
    }
]);
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
(function() {
  'use strict';

  angular
    .module('information')
    .config(InformationRoutes);

  InformationRoutes.$inject = ['$stateProvider'];

  function InformationRoutes($stateProvider) {

    // Define states.
    var information_state = {
      abstract: false,
      url: '/information',
      templateUrl: 'modules/information/views/information.client.view.html',
      controller: 'InformationViewController',
      controllerAs: 'informationView',
      data: {
        title: 'Information'
      }
    };

    var information_about_state = {
      abstract: false,
      url: '/about',
      templateUrl: 'modules/information/views/about.information.client.view.html',
      controller: 'AboutInformationViewController',
      controllerAs: 'informationAboutView',
      data: {
        title: 'About'
      }
    };

    // Populate provider.
    $stateProvider
      .state('information', information_state)
      .state('information.about', information_about_state);
  }
})();
(function() {
  'use strict';

  angular
    .module('information')
    .controller('AboutInformationViewController', AboutInformationViewController);

  AboutInformationViewController.$inject = ['$scope', 'Authentication'];

  function AboutInformationViewController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.appTitle = 'Watermark';
    $scope.versionNumber = 'Alpha v0.23.314';
    // $scope.logopath = '/modules/core/img/brand/conflux-logo-idea-v1-md-white.png';
    // $scope.logopath = '/modules/core/img/brand/watermark_logo_20151223_v014c0_transparent.png';
    $scope.logopath = '/modules/core/img/brand/watermark_logo_20151223_v014c1_transparent.png';
    // $scope.logopath = '/modules/core/img/brand/watermark_logo_20151223_v014c2_transparent.png';
    $scope.currentRoute = 'About';
    $scope.clicked = clicked;
    // console.log($scope.currentRoute);

    function clicked(target) {
        // console.log(target);
    }
  }
})();
(function() {
  'use strict';

  angular
    .module('information')
    .controller('InformationViewController', InformationViewController);

  InformationViewController.$inject = ['$scope', 'Authentication'];

  function InformationViewController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.currentRoute = 'Information';
    $scope.clicked = clicked;
    // console.log($scope.currentRoute);

    function clicked(target) {
        // console.log(target);
    }
  }
})();
(function() {
  'use strict';

 //  angular
 //    .module('models')
 //    .run(ModelsConfig);

 //  ModelsConfig.$inject = ['Menus'];

	// function ModelsConfig(Menus) {
	// 	// Set top bar menu items
	// 	Menus.addMenuItem('topbar', 'Models', 'models', 'dropdown', '/models(/create)?');
	// 	Menus.addSubMenuItem('topbar', 'models', 'List Models', 'models');
	// 	Menus.addSubMenuItem('topbar', 'models', 'New Model', 'models/create');
	// }
})();
(function() {
	'use strict';

	angular
		.module('models')
		.config(ModelsRoutes);

	ModelsRoutes.$inject =['$stateProvider'];

	function ModelsRoutes($stateProvider) {

    // Define states.
    var models_state = {
      abstract: false,
      url: '/models',
      templateUrl: 'modules/models/views/models.client.view.html',
      controller: 'ModelsViewController',
      controllerAs: 'modelsView',
      data: {
        title: 'Models'
      }
    };

    var models_list_state = {
      abstract: false,
      url: '/list',
      templateUrl: 'modules/models/views/list-models.client.view.html',
      controller: 'ModelsController',
      controllerAs: 'models'
    };

    var models_list_details_state = {
      abstract: false,
      url: '/details/:modelId',
      templateUrl: 'modules/models/views/view-model.client.view.html',
      controller: 'ModelsController',
      controllerAs: 'models'
    };

    var models_list_edit_state = {
      abstract: false,
      url: '/edit/:modelId',
      templateUrl: 'modules/models/views/edit-model.client.view.html',
      controller: 'ModelsController',
      controllerAs: 'models'
    };

    var models_list_load_state = {
      abstract: false,
      url: '/load',
      templateUrl: 'modules/models/views/create-model.client.view.html',
      controller: 'ModelsController',
      controllerAs: 'models'
    };

    var models_list_design_state = {
      abstract: false,
      url: '/design',
      templateUrl: 'modules/models/views/models.design.client.view.html',
      controller: 'ModelsDesignViewController',
      controllerAs: 'modelsDesign'
    };

    // Populate provider.
		$stateProvider
      .state('models', models_state)
      .state('models.list', models_list_state)
      .state('models.list.details', models_list_details_state)
      .state('models.list.edit', models_list_edit_state)
      .state('models.list.load', models_list_load_state)
      .state('models.list.design', models_list_design_state);
	}
})();
(function() {
	'use strict';

	// Models controller
	angular
		.module('models')
		.controller('ModelsController', ModelsController);

	ModelsController.$inject = ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Models'];

	function ModelsController($scope, $state, $stateParams, $location, Authentication, Models) {
		$scope.authentication = Authentication;
		$scope.currentRoute = 'Models';
		$scope.currentUser = Authentication.user;
		$scope.create = create;
		$scope.remove = remove;
		$scope.update = update;
		$scope.find = find;
		$scope.findOne = findOne;
		// console.log($scope.currentRoute);

		// Create new Model
		function create() {
			// Create new Model object
			var model = new Models ({
				name: this.name
			});

			// Redirect after save
			model.$save(function(response) {
				// $location.path('models/' + response._id);
				$state.go('models', {}, {reload: true});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Remove existing Model
		function remove(model) {
			if ( model ) {
				model.$remove();

				for (var i in $scope.models) {
					if ($scope.models [i] === model) {
						$scope.models.splice(i, 1);
					}
				}
			} else {
				$scope.model.$remove(function() {
					// $location.path('models');
					$state.go('models', {}, {reload: true});
				});
			}
		}

		// Update existing Model
		function update() {
			var model = $scope.model;

			model.$update(function() {
				// $location.path('models/' + model._id);
				$state.go('models.list', {}, {reload: true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Find a list of Formulations belonging to the current user.
		function find(user) {
			Models.query(function(models) {
				$scope.models = user ? models.filter(function(model) {
					return model.user._id === user._id;
				}) : models;
			});
		}

		// Find existing Model
		function findOne() {
			$scope.model = Models.get({
				modelId: $stateParams.modelId
			});
		}
	}
})();
'use strict';

angular.module('core').controller('ModelsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {

        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.clicked = function(target) {
            console.log(target);
        };
    }
]);
'use strict';

angular.module('core').controller('ModelsCurateViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.curate.client.view';

        $scope.clicked = function(target) {
            console.log(target);
        };

    }
]);
'use strict';

angular.module('core').controller('ModelsDesignViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.design.client.view';

        $scope.clicked = function(target) {
            console.log(target);
        };

    }
]);
'use strict';

angular.module('core').controller('ModelsPublishViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'models.publish.client.view';

        $scope.clicked = function(target) {
            console.log(target);
        };

    }
]);
(function() {
  'use strict';

  //Models service used to communicate Models REST endpoints
  angular
    .module('models')
    .factory('Models', Models);

  Models.$inject = ['$resource'];

	function Models($resource) {
		return $resource('models/:modelId', { modelId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
})();
(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('AnalysisDataFactory', AnalysisDataFactory);

  AnalysisDataFactory.$inject = ['$q', '$http', '$log', '$resource'];

  function AnalysisDataFactory($q, $http, $log, $resource) {
    // APPROACH 1.
    // Requires managing deferred object and custom promise.
    // return {
    //   getData: function(target) {
    //     var _deferred = $q.defer(); // make the promise.
    //     $http.get(target)
    //       .success(function(data) {
    //         _deferred.resolve({
    //           attribute1: data.attribute1,
    //           attribute2: data.attribute2
    //         });
    //       })
    //       .error(function(msg, code) {
    //         _deferred.reject(msg);
    //         $log.error(msg, code);
    //       });
    //     return _deferred.promise;
    //   }
    // };

    // APPROACH 2 TEST.
    return $resource('https://api.github.com/repos/:username/:repo/issues', {
      state: 'open'
    }, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }
})();
(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('httpq', httpqFactory);

  httpqFactory.$inject = ['$http', '$q'];

  function httpqFactory($http, $q) {
    return {
      get: function() {
        var deferred = $q.defer();
        $http.get.apply(null, arguments)
          .success(deferred.resolve)
          .error(deferred.resolve);
        return deferred.promise;
      }
    };
  }
})();
(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('FormulationRetrieval', FormulationRetrieval);

  FormulationRetrieval.$inject = ['$http', '$q'];

  function FormulationRetrieval($http, $q) {

    var currentFormulation = null;
    var analysisConfig = null;
    var maufConfig = null;
    var datagridConfig = null;
    var graphConfig = null;
    var mapConfig = null;

    // Primary access point for service data.
    FormulationRetrieval.getFormulation = function (target) {
      var deferred = $q.defer();
      if(currentFormulation !== null) {
        deferred.resolve(currentFormulation);  // Cache
      }
      else {
        var promise = $http
          .get(target)
          .then(function (response) {
            var d = new Date();
            var t = d.getTime();
            // console.log('formulation data resolved at: ', d, t,' to: ', response.data);     // debug
            currentFormulation = FormulationRetrieval.configureFormulation(response.data);
            return currentFormulation;
          })
          .finally(function() {
            var d = new Date();
            var t = d.getTime();
            // console.log('Finished formulation retrieval at: ', d, t);    // debug
          });
        // console.log('formulationPromise current value: ', promise);  // debug
        return promise;
      }

      return deferred.promise;
    };

    // Populate various config objects.
    FormulationRetrieval.getAnalysisConfig = function (fc) {
      // console.log('getAnalysis data resolved to: ', fc.analysisConfig);  // debug
      return FormulationRetrieval.setConfigurationData(fc.analysisConfig, analysisConfig);
    };

    FormulationRetrieval.getMaufConfig = function (fc) {
      // console.log('getMaufConfig data resolved to: ', fc.maufConfig);  // debug
      return FormulationRetrieval.setConfigurationData(fc.maufConfig, maufConfig);
    };

    FormulationRetrieval.getGraphConfig = function (fc) {
      // console.log('getGraphConfig data resolved to: ', fc.graphConfig);  // debug
      return FormulationRetrieval.setConfigurationData(fc.graphConfig, graphConfig);
    };

    FormulationRetrieval.getDatagridConfig = function (fc) {
      // console.log('getDatagridConfig data resolved to: ', fc.datagridConfig);  // debug
      return FormulationRetrieval.setConfigurationData(fc.datagridConfig, datagridConfig);
    };

    FormulationRetrieval.getMapConfig = function (fc) {
      // console.log('getMapConfig data resolved to: ', fc.mapConfig);  // debug
      return FormulationRetrieval.setConfigurationData(fc.mapConfig, mapConfig);
    };

    // Helper methods.
    FormulationRetrieval.configureFormulation = function (f) {
      FormulationRetrieval.formulationContainer = f;
      FormulationRetrieval.loadFormulationSourceData(FormulationRetrieval.formulationContainer);
      FormulationRetrieval.loadFormulationGisData(FormulationRetrieval.formulationContainer);
      return FormulationRetrieval.formulationContainer;
    };

    FormulationRetrieval.loadFormulationSourceData = function (fc) {
      function parseFormulationDatasource(fd, destination) {
        Papa.parse(fd, {
          complete: function(results) {
            // console.log('Finished parsing the data. New data looks like: ');
            // console.log(results.data);
            // console.log('-------------------------------------------------');
            destination.datum = results.data;
          }
        });
      }

      function loadData(target) {
        var promise = $http
          .get(target.source)
          .then(function (response) {
            // console.log('Finished loading data for file: ' + target.source + '. Now parsing the following data: ');
            // console.log(response.data);
            // console.log('-------------------------------------------------');
            var d = new Date();
            var t = d.getTime();
            // console.log('Finished parsing data source ' + target.source + ' at: ', d, t);   // debug
            // parseFormulationDatasource(response.data, target);
            return parseFormulationDatasource(response.data, target);
          })
          .finally(function() {
            var d = new Date();
            var t = d.getTime();
            // console.log('Finished loading data source ' + target.source + ' at: ', d, t);    // debug
          });
        return promise;
      }

      var datasources = [fc.datagridConfig.datasources.tabledata, fc.graphConfig.datasources.graphdata, fc.graphConfig.datasources.graphContextData];
      angular.forEach(datasources, loadData);
    };

    FormulationRetrieval.loadFormulationGisData = function (fc) {
      function loadGeodata(target) {
        angular.forEach(target, function(value, key) {
          var promise = $http
            .get(value.source)
            .then(function (response) {
              value.datum = response.data;
              return value.datum;
            })
            .finally(function() {
              var d = new Date();
              var t = d.getTime();
              // console.log('Finished loading GIS data source ' + target.source + ' at: ', d, t);    // debug
            });
          return promise;
        });
      }

      var datasources = [fc.mapConfig.datasources.geojson];
      angular.forEach(datasources, loadGeodata);
    };

    FormulationRetrieval.setConfigurationData = function (source, targetConfig) {
      var deferred = $q.defer();
      if(targetConfig !== null) {
        deferred.resolve(targetConfig);  // from Cache
      }
      else {
        targetConfig = source;   // from Server
        return targetConfig;
      }
      return deferred.promise;
    };

    return FormulationRetrieval;
  }
})();
(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('TestDeferFactory', TestDeferFactory);

  TestDeferFactory.$inject = ['$q'];

  function TestDeferFactory ($q) {

    TestDeferFactory.getTested = function () {
      var deferred = $q.defer();
      console.log('deferred object created.');

      deferred.promise.then(
        console.log('resolving deferred promise in then() block.'),
        function (result) {
          console.log('promise success!');
        }, function (error) {
          console.log('promise error!');
        }
      );

      console.log('resolving deferred object via resolve().');
      deferred.resolve();

      console.log('returning deffered promise resolve.');
    };

    return TestDeferFactory;
  }

})();
(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .factory('TestFactory', TestFactory);

  TestFactory.$inject = ['$http'];

  function TestFactory($http) {
    var helloFactory = 'hello TestFactory!';
    var goodbyeFactory = 'goodbye TestFactory!';

    return {
      helloFactory: helloFactory,
      goodbyeFactory: goodbyeFactory
    };
  }

  function testDeferredAngularSync() {
    var deferred = $q.defer();

    deferred.promise.then(function(result) {
      console.log('promise success');
    }, function(error) {
      console.log('promise error');
    });

    console.log('resolving deferred');
    deferred.resolve();
  }

})();
(function() {
  'use strict';

  angular
    .module('mcsdss.providers')
    .service('multipartForm', multipartForm);

  multipartForm.$inject = ['$scope', '$http']; // Added $scope dependency

  function multipartForm($scope, $http) {
    $scope.post = function(uploadUrl, data) {  // replaced this.post with $scope.post
      var fd = new FormData();

      for (var key in data) {
        fd.append(key, data[key]);
      }

      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity, // prevent serialization of data.
        headers: {
          'Content-Type': undefined       // let browser handle data typing.
        }
      });
    };
  }
})();
(function() {
	'use strict';

	angular
		.module('publications')
		.config(PublicationsRoutes);

	PublicationsRoutes.$inject = ['$stateProvider'];

	function PublicationsRoutes($stateProvider) {

    // Define states.
    var publications_state = {
      abstract: false,
      url: '/publications',
      templateUrl: 'modules/publications/views/publications.client.view.html',
      controller: 'PublicationsViewController',
      controllerAs: 'publicationsView',
      data: {
        title: 'Publications'
      }
    };

    var publications_list_state = {
      abstract: false,
      url: '/list',
      templateUrl: 'modules/publications/views/list-publications.client.view.html',
      controller: 'PublicationsController',
      controllerAs: 'publications'
    };

    var publications_list_details_state = {
      abstract: false,
      url: '/details/:publicationId',
      templateUrl: 'modules/publications/views/view-publication.client.view.html',
      controller: 'PublicationsController',
      controllerAs: 'publications'
    };

    var publications_list_edit_state = {
      abstract: false,
      url: '/edit/:publicationId',
      templateUrl: 'modules/publications/views/edit-publication.client.view.html',
      controller: 'PublicationsController',
      controllerAs: 'publications'
    };

    var publications_list_load_state = {
      abstract: false,
      url: '/load',
      templateUrl: 'modules/publications/views/create-publication.client.view.html',
      controller: 'PublicationsController',
      controllerAs: 'publications'
    };

    var publications_list_curate_state = {
      abstract: false,
      url: '/curate',
      templateUrl: 'modules/publications/views/edit-publication.client.view.html', // '/publications.curate.client.view.html'
      controller: 'PublicationsController', //'PublicationsCurateViewController'
      controllerAs: 'publications' // 'publicationsCurate'
    };

    var publications_list_publish_state = {
      abstract: false,
      url: '/publish',
      templateUrl: 'modules/publications/views/publications.publish.client.view.html',
      controller: 'PublicationsPublishViewController',
      controllerAs: 'publicationsPublish'
    };

    // Populate provider.
		$stateProvider
      .state('publications', publications_state)
      .state('publications.list', publications_list_state)
      .state('publications.list.details', publications_list_details_state)
      .state('publications.list.edit', publications_list_edit_state)
      .state('publications.list.load', publications_list_load_state)
      .state('publications.list.curate', publications_list_curate_state)
      .state('publications.list.publish', publications_list_publish_state);
	}
})();
(function() {
	'use strict';

	// Publications controller
	angular
		.module('publications')
		.controller('PublicationsController', PublicationsController);

	PublicationsController.$inject = ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Publications'];

	function PublicationsController($scope, $state, $stateParams, $location, Authentication, Publications) {
		$scope.authentication = Authentication;
		$scope.currentRoute = 'Publications';
		$scope.currentUser = Authentication.user;
		$scope.create = create;
		$scope.remove = remove;
		$scope.update = update;
		$scope.find = find;
		$scope.findOne = findOne;
		// console.log($scope.currentRoute);

		// Create new Publication
		function create() {
			// Create new Publication object
			var publication = new Publications ({
				name: this.name
			});

			// Redirect after save
			publication.$save(function(response) {
				// $location.path('publications/' + response._id);
				$state.go('publications', {}, {reload: true});

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Remove existing Publication
		function remove(publication) {
			if ( publication ) {
				publication.$remove();

				for (var i in $scope.publications) {
					if ($scope.publications [i] === publication) {
						$scope.publications.splice(i, 1);
					}
				}
			} else {
				$scope.publication.$remove(function() {
					// $location.path('publications');
					$state.go('publications', {}, {reload: true});
				});
			}
		}

		// Update existing Publication
		function update() {
			var publication = $scope.publication;

			publication.$update(function() {
				// $location.path('publications/' + publication._id);
				$state.go('publications.list', {}, {reload: true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		// Find a list of Publications
		// $scope.find = function() {
		// 	$scope.publications = Publications.query();
		// };

		// Find a list of Formulations belonging to the current user.
		function find(user) {
			Publications.query(function(publications) {
				$scope.publications = user ? publications.filter(function(publication) {
					return publication.user._id === user._id;
				}) : publications;
			});
		}

		// Find existing Publication
		function findOne() {
			$scope.publication = Publications.get({
				publicationId: $stateParams.publicationId
			});
		}
	}
})();
'use strict';

angular.module('core').controller('PublicationsViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {

        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.clicked = function(target) {
            console.log(target);
        };
    }
]);
'use strict';

angular.module('core').controller('PublicationsCurateViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.curate.client.view';

        $scope.clicked = function(target) {
            console.log(target);
        };

    }
]);
'use strict';

angular.module('core').controller('PublicationsPublishViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.whoami = 'publications.publish.client.view';

        $scope.clicked = function(target) {
            console.log(target);
        };
    }
]);
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
(function() {
	'use strict';

	// Config HTTP Error Handling
	angular
		.module('users')
		.config(UsersConfig);

		UsersConfig.$inject = ['$httpProvider'];

	function UsersConfig ($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
})();
(function() {
	'use strict';

	angular
		.module('users')
		.config(UsersRoutes);

		UsersRoutes.$inject =	['$stateProvider'];

		function UsersRoutes($stateProvider) {

      // Define states.
      var signup_state = {
        url: '/signup',
        templateUrl: 'modules/users/views/authentication/signup.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'authorize'
      };

      var signin_state = {
        url: '/signin',
        templateUrl: 'modules/users/views/authentication/signin.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'authorize'
      };

      var forgot_state = {
        url: '/password/forgot',
        templateUrl: 'modules/users/views/password/forgot-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'password'
      };

      var reset_invalid_state = {
        url: '/password/reset/invalid',
        templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
      };

      var reset_success_state = {
        url: '/password/reset/success',
        templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
      };

      var reset_state = {
        url: '/password/reset/:token',
        templateUrl: 'modules/users/views/password/reset-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'password'
      };

      var signout_state = {
        url: '/auth/signout'
      };

      var profile_state = {
        abstract: false,
        url: '/profile',
        templateUrl: 'modules/users/views/profile.client.view.html',
        controller: 'ProfileViewController',
        controllerAs: 'profileView',
        data: {
          title: 'Profile'
        }
      };

      var profile_view_state = {
        abstract: false,
        url: '/view',
        templateUrl: 'modules/users/views/settings/view-profile.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      };

      var profile_edit_state = {
        abstract: false,
        url: '/edit',
        templateUrl: 'modules/users/views/settings/edit-profile.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      };

      var profile_accounts_state = {
        abstract: false,
        url: '/accounts',
        templateUrl: 'modules/users/views/settings/social-accounts.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      };

      var profile_password_state = {
        abstract: false,
        url: '/password',
        templateUrl: 'modules/users/views/settings/change-password.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      };

      // Populate provider.
			$stateProvider
  			.state('signup', signup_state)
  			.state('signin', signin_state)
  			.state('forgot', forgot_state)
  			.state('reset-invalid', reset_invalid_state)
  			.state('reset-success', reset_success_state)
        .state('reset', reset_state)
  			.state('signout', signout_state)
        .state('profile', profile_state)
        .state('profile.view', profile_view_state)
        .state('profile.edit', profile_edit_state)
        .state('profile.accounts', profile_accounts_state)
        .state('profile.password', profile_password_state);
		}
})();
(function() {
	'use strict';

	angular
		.module('users')
		.controller('AuthenticationController', AuthenticationController);

	AuthenticationController.$inject = ['$scope', '$http', '$location', 'Authentication'];

	function AuthenticationController($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		$scope.signup = signup;
		$scope.signin = signin;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		function signup() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		}

		function signin() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		}
	}

})();
(function() {
	'use strict';

	angular
		.module('users')
		.controller('PasswordController', PasswordController);

	PasswordController.$inject = ['$scope', '$stateParams', '$http', '$location', 'Authentication'];

	function PasswordController($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		$scope.askForPasswordReset = askForPasswordReset;
		$scope.resetUserPassword = resetUserPassword;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		function askForPasswordReset() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		}

		// Change user password
		function resetUserPassword() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		}
	}

})();
'use strict';

angular.module('core').controller('ProfileViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.currentRoute = 'Profile';
        // console.log($scope.currentRoute);

        $scope.clicked = function(target) {
            console.log(target);
        };
    }
]);
(function() {
	'use strict';

	angular
		.module('users')
		.controller('SettingsController', SettingsController);

	SettingsController.$inject = ['$scope', '$http', '$location', 'Users', 'Authentication'];

	function SettingsController($scope, $http, $location, Users, Authentication) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
		$scope.hasConnectedAdditionalSocialAccounts = hasConnectedAdditionalSocialAccounts;
		$scope.isConnectedSocialAccount = isConnectedSocialAccount;
		$scope.removeUserSocialAccount = removeUserSocialAccount;
		$scope.updateUserProfile = updateUserProfile;
		$scope.changeUserPassword = changeUserPassword;
		// console.log(Authentication);

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts
		function hasConnectedAdditionalSocialAccounts(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		}

		// Check if provider is already in use with current user
		function isConnectedSocialAccount(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		}

		// Remove a user social account
		function removeUserSocialAccount(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		}

		// Update a user profile
		function updateUserProfile(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		}

		// Change user password
		function changeUserPassword() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		}
	}

})();
(function() {
  'use strict';

  // Authentication service for user variables
  angular
    .module('users')
    .factory('Authentication', Authentication);

	function Authentication() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
})();
(function() {
  'use strict';

  // Users service used for communicating with the users REST endpoint
  angular
    .module('users')
    .factory('Users', Users);

  Users.$inject = ['$resource'];

	function Users($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
})();