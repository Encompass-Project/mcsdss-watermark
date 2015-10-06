'use strict';

angular.module('core').controller('AnalyzeTestViewController', ['$scope', '$state', '$location', 'Authentication', 'httpq', 'AnalysisDataLoader',
    function($scope, $state, $location, Authentication, $httpq, AnalysisDataLoader) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $state.go('dashboard.analyze.layout'); // Required to get nested named views to populate correctly. Not routing correctly from routes.js without this.

        $scope.sourceFile = './data/BSGAM_Heads_Wells_Drains_Zones_Master.csv';
        $scope.sourceData;

        /*
        // Need a way to manage sharing async data between controllers in order to populate child views properly and not repeat http requests.
        // See: http://stackoverflow.com/questions/18377348/share-async-data-between-controllers-without-making-multiple-requests
        // http://stackoverflow.com/questions/18004298/angular-ui-router-get-asynchronous-data-with-resolve
        // http://stackoverflow.com/questions/31272074/passing-scope-variable-to-child-controller
        */

        $httpq.get($scope.sourceFile)
            .then(function(data) {
                $scope.parseCsvData(data);
            })
            .catch(function(data, status) {
                console.error('Load error', response.status, response.data);
            })
            .finally(function() {
                console.log($scope.sourceData); // Data is available here to inject into sub0controllers for Graph, Map and Datatable.
            });

        $scope.clicked = function(target) {
            console.log(target);
        };

        $scope.traceData = function(data) {
            console.log(data);
            // $scope.sourceData = data;
        };

        $scope.parseCsvData = function(csvData) {
            Papa.parse(csvData, {
                complete: function(results) {
                    // console.log(results.data);
                    // Assign data to scope var.
                    $scope.sourceData = results.data;
                    $scope.traceData($scope.sourceData);
                }
            });
        };

        // INHERITED SCOPE.
        // APPROACH 1.
        // Directly referenced by child scope.
        // Binding breaks as soon as child scope changes value.
        //
        // $scope.location = "Mos Eisley North";
        // $scope.move = function(newLocation) {
        //     $scope.location = newLocation;
        // }

        // APPROACH 2.
        // Inherited scope.
        //
        // $scope.sandcrawler = {};
        // $scope.sandcrawler.location = "Mos Eisley North";

        // EVENT-BASED.
        // APPROACH 1.
        // EMIT from CHILD.
        //
        // $scope.location = "Mos Eisley North";
        // $scope.$on('summon', function(e, newLocation) {
        //     $scope.location = newLocation;
        //     // e.stopPropogation();     // Can stop event propagation upstream here.
        // });

        // APPROACH 2.
        // BROADCAST from PARENT.
        //
        // $scope.location = "Mos Eisley North";
        // $scope.recall = function () {
        //     $scope.$broadcast('recall', $scope.location);
        // };

        // APPROACH 3.
        // SIBLINGS via PARENT.
        //
        $scope.$on('requestDroidRecall', function (e) {
            console.log($scope.this, 'received an emission, sending out a broadcast');
            $scope.$broadcast('executeDroidRecall');
        });

    }
]);
