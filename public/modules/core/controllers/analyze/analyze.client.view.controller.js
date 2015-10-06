'use strict';

angular.module('core').controller('AnalyzeViewController', ['$scope', '$state', '$location', 'Authentication', 'httpq',
    function ($scope, $state, $location, Authentication, $httpq) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $state.go('dashboard.analyze.layout'); // Required to get nested named views to populate correctly. Not routing correctly from routes.js without this.

        $scope.sourceFile_A = './data/BSGAM_Heads_Wells_Drains_Zones_Master.csv';
        $scope.sourceFile_O = './data/BSGAM_Heads_Wells_Drains_Zones_Original.csv';
        $scope.sourceFile_M = './data/BSGAM_Heads_Wells_Drains_Zones_Modified.csv';

        $scope.sourceData;

        $httpq.get($scope.sourceFile_A)
            .then(function (data) {
                $scope.parseCsvData(data);
                // $scope.sortParsedData($scope.sourceData);
            })
            .catch(function (data, status) {
                console.error('Load error', response.status, response.data);
            })
            .finally(function () {
                // console.log($scope.sourceData);
                // Data is available here to inject into sub-controllers for Graph, Map and Datatable.
                console.log('Analysis data loaded. Broadcasting...');
                $scope.$broadcast('analysisDataLoaded', $scope.sourceData);
            });

        $scope.clicked = function (target) {
            console.log(target);
        };

        $scope.parseCsvData = function (csvData) {
            Papa.parse(csvData, {
                complete: function (results) {
                    // console.log(results.data);
                    $scope.sourceData = results.data;
                }
            });
        };

        /*
        // Need a way to manage sharing async data between controllers in order to populate child views properly and not repeat http requests.
        // See: http://stackoverflow.com/questions/18377348/share-async-data-between-controllers-without-making-multiple-requests
        // http://stackoverflow.com/questions/18004298/angular-ui-router-get-asynchronous-data-with-resolve
        // http://stackoverflow.com/questions/31272074/passing-scope-variable-to-child-controller
        */

        // Should not be required. Data incorrectly structured.
        $scope.sortParsedData = function (parsedData) {
            console.log('parsing data...');

            // Need to seperate the sourceData into seperate rows for each modified and original run.
            // This indicates that data should be structured on a per row basis for visualizing.
            // Currently we globbed into single rows - need to break apart externally and load properly.
            // Further thinking - will need to make the grpah, table and map all configurable through the formulation workflow.
            // There is no way to anticipate data strux and key mappings, users will need a way to accomplish this.
            // We can use our Formulation workflow as designed for this stage.

            angular.forEach(parsedData, function(value, key){
                // console.log(key + ': ' + value);
                angular.forEach(value, function(value, key){
                    console.log(key + ': ' + value);
                });
            });
        };

        // Testing out evented comms.
        $scope.$on('currentGraphTarget', function (e) {
            console.log($scope.this, 'received an emission from graph, sending out a broadcast');
            $scope.$broadcast('newGraphTarget');
        });

        // Testing events.

        // function Sandcrawler($scope) {
        //     $scope.location = "Mos Eisley North";
        //     $scope.move = function(newLocation) {
        //         $scope.location = newLocation;
        //     }
        // };

        // $scope.location = 'Mos Eisley North';
        // $scope.move = function(newLocation) {
        //     $scope.location = newLocation;
        // };

        // function Droid($scope) {
        //     $scope.sell = function(newLocation) {
        //         $scope.location = newLocation;
        //     }
        // };

        // $scope.location = "Mos Eisley North";
        // $scope.move = function(newLocation) {
        //     $scope.location = newLocation;
        // };
    }
]);
